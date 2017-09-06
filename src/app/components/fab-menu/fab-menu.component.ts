import { Component, EventEmitter, OnInit, Input, Output  } from '@angular/core';
import { FabItem } from 'app/classes/FabItem';

@Component({
  selector: 'app-fab-menu',
  templateUrl: './fab-menu.component.html',
  styleUrls: ['./fab-menu.component.less']
})
export class FabMenuComponent implements OnInit {
  @Input() fabItems: FabItem[];
  @Output() onItemSelect = new EventEmitter<FabItem>();

  public fabState: string;

  constructor() { }

  ngOnInit() {
    this.fabState = 'closed';
  }

  public toggleFab(): void {
    if (this.fabState === 'closed') {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  private openMenu(): void {
    this.fabState = 'open';
  }

  private closeMenu(): void {
    this.fabState = 'closed';
  }

  public selectItem(item: FabItem): void {
    this.closeMenu();
    this.onItemSelect.emit(item);
  }
}