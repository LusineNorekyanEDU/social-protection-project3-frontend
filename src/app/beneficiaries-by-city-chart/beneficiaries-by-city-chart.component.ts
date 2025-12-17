import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  effect,
  inject, computed
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, startWith } from 'rxjs';
import { MetricsApiService } from '../services/metrics-api.service';
import { FilterStateService } from '../services/filter-state.service';
import { BeneficiariesByCityDto } from '../models/metrics.model';
import { ExportCsvButtonComponent } from '../export-csv-button.component/export-csv-button.component';

@Component({
  selector: 'app-beneficiaries-by-city-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    ExportCsvButtonComponent
  ],
  templateUrl: './beneficiaries-by-city-chart.component.html',
  styleUrls: ['./beneficiaries-by-city-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficiariesByCityChartComponent {
  private readonly metricsApi = inject(MetricsApiService);
  private readonly filterState = inject(FilterStateService);

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // 🔹 Observable → Signal
  private readonly data$ = this.filterState.filter$.pipe(
    switchMap(filter =>
      this.metricsApi.getBeneficiariesByCity(filter)
    ),
    startWith(null)
  );

  readonly data = toSignal<BeneficiariesByCityDto | null>(this.data$, {
    initialValue: null
  });

  readonly loading = computed(() => this.data() === null);

  readonly chartData = computed<ChartConfiguration<'bar'>['data']>(() => {
    const dto = this.data();
    if (!dto) {
      return { labels: [], datasets: [] };
    }

    return {
      labels: dto.items.map(i => i.city ?? 'Unknown'),
      datasets: [
        { data: dto.items.map(i => i.beneficiaryCount), label: 'Beneficiaries' }
      ]
    };
  });

  readonly chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  };

  constructor() {

    effect(() => {
      this.chartData();
      queueMicrotask(() => this.chart?.update());
    });
  }
}
