import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface DialogData {
  readonly rows: readonly unknown[];
  readonly displayedColumns: readonly string[];
}

@Component({
  standalone: true,
  selector: 'app-financial-liability-dialog',
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './financial-liability-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FinancialLiabilityDialogComponent implements AfterViewInit {
  readonly dataSource: MatTableDataSource<unknown>;
  readonly displayedColumns: readonly string[];

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  constructor(
    @Inject(MAT_DIALOG_DATA) private readonly data: DialogData,
    private readonly dialogRef: MatDialogRef<FinancialLiabilityDialogComponent>
  ) {
    this.dataSource = new MatTableDataSource([...data.rows]);
    this.displayedColumns = data.displayedColumns;
  }

  get usePagination(): boolean {
    return this.dataSource.data.length > 20;
  }

  close(): void {
    this.dialogRef.close();
  }

  ngAfterViewInit(): void {
    if (this.usePagination && this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
}
