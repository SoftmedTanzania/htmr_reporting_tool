import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-multi-selector',
  templateUrl: './multi-selector.component.html',
  styleUrls: ['./multi-selector.component.css']
})
export class MultiSelectorComponent implements OnInit {
  @Input() inputItems;
  @Output() dataSelectorCancelledEvent = new EventEmitter;
  @Output() selectedItemsChanged = new EventEmitter;
  @Input() outPutItems: Array<any>;
  @Input() label;

  constructor() {
  }

  ngOnInit() {
  }

  selectItem(item, source, destination: Array<any> = [], filterAction) {
    source = source.filter((filteredItem) => {
      return filteredItem.id !== item.id;
    });
    destination = [...destination, item];
    if (filterAction === 'reverse') {
      this.inputItems = destination;
      this.outPutItems = source;
      this.selectedItemsChanged.emit(this.outPutItems);
      return true;
    }
    this.inputItems = source;
    this.outPutItems = destination;
    this.selectedItemsChanged.emit(this.outPutItems);
  }

  showInterest(item) {
    // this.inputItems = this.inputItems.filter((filteredItem) => {
    //   return filteredItem.id === item.id ? filteredItem['ofInterest'] = true : filteredItem['ofInterest'] = false;
    // });
    //
    // this.outPutItems = this.outPutItems.filter((filteredItem) => {
    //   return filteredItem.id === item.id ? filteredItem['ofInterest'] = true : filteredItem['ofInterest'] = false;
    // });
  }

  closeDataSelector() {
    this.dataSelectorCancelledEvent.emit();
  }

}
