import {
  ChangeDetectionStrategy,
  Component, computed,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap, startWith } from 'rxjs';
import { MetricsApiService } from '../services/metrics-api.service';
import { FilterStateService } from '../services/filter-state.service';
import { FinancialLiabilityDto } from '../models/metrics.model';

@Component({
  selector: 'app-financial-liability-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule
  ],
  templateUrl: './financial-liability-chart.component.html',
  styleUrls: ['./financial-liability-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialLiabilityChartComponent {
  private readonly metricsApi = inject(MetricsApiService);
  private readonly filterState = inject(FilterStateService);

  /**
   * Observable → Signal
   * Automatically re-fetches when filters change
   */
  private readonly data$ = this.filterState.filter$.pipe(
    switchMap(filter =>
      this.metricsApi.getFinancialLiability(filter)
    ),
    startWith(null)
  );

  readonly data = toSignal<FinancialLiabilityDto | null>(this.data$, {
    initialValue: null
  });

  readonly loading = computed(() => this.data() === null);

  readonly displayedColumns = [
    'programName',
    'approvedCount',
    'payoutAmount',
    'projectedLiability'
  ];
}
