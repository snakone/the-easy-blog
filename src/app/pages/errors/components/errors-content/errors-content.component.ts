import { ChangeDetectionStrategy, Component, effect, Injectable, input, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EXPANDED_TABLE_ANIMATION } from '@shared/data/data';
import { CustomError } from '@shared/types/class.types';

const headerSwitch = {
  name: 'Nombre',
  type: 'Tipo',
  author: 'Autor',
  date: 'Fecha',
  url: 'URL',
  status: 'Estado'
}

@Injectable()
class CustomMatPaginatorIntl extends MatPaginatorIntl {
  firstPageLabel: string = "";
  lastPageLabel: string = "";
  previousPageLabel: string = "";
  nextPageLabel: string = "";
}

@Component({
  selector: 'app-errors-content',
  templateUrl: './errors-content.component.html',
  styleUrl: './errors-content.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
  animations: EXPANDED_TABLE_ANIMATION,
  providers: [
    {
      provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl
    }
  ]
})

export class ErrorsContentComponent {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  errors = input<CustomError[]>([]);

  columns: string[] = ['name', 'type', 'author', 'date', 'url', 'status'];
  columnsWithExpand = [...this.columns, 'expand'];
  dataSource = new MatTableDataSource([]);
  expandedEl: CustomError | null;

  constructor() {
    effect(() => {
      this.dataSource.data = this.errors();
      this.dataSource.paginator = this.paginator;
    });

    this.dataSource.filterPredicate = this.customFilter;
  }

  public getHeaderString(value: string): string {
    return headerSwitch[value] || value;
  }

  public filter(value: Event): void {
    const filterValue = (value.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private customFilter(data: CustomError, filter: string): boolean {
    if(
      data.name.toLowerCase().includes(filter) ||
      data.type.includes(filter) ||
      data.author.includes(filter) ||
      data.date.includes(filter) ||
      data.url.toLowerCase().includes(filter) ||
      String(data.status).includes(filter) ||
      data.message.toLowerCase().includes(filter)
    ) {
      return true;
    }
    return false;
  }

}
