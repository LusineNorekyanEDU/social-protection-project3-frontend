import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterStateService } from '../services/filter-state.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDateRangeInput, MatDateRangePicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-dashboard-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './dashboard-filters.component.html',
  styleUrls: ['./dashboard-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardFiltersComponent {
  private readonly filterState = inject(FilterStateService);

  from: Date | null = null;
  to: Date | null = null;

  onDateChange(): void {
    if (this.from && this.to && this.from > this.to) {
      const tmp = this.from;
      this.from = this.to;
      this.to = tmp;
    }

    this.filterState.updateFilter({
      from: this.from,
      to: this.to
    });
  }

  clear(): void {
    this.from = null;
    this.to = null;
    this.filterState.reset();
  }
}
