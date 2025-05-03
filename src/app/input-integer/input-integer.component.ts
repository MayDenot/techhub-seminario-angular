import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-input-integer',
  standalone: false,
  templateUrl: './input-integer.component.html',
  styleUrl: './input-integer.component.scss'
})

export class InputIntegerComponent {
  @Input() amount!: number;
  @Input() max!: number;

  @Output() amountChange = new EventEmitter<number>();
  @Output() maxReached = new EventEmitter<string>();

  upAmount(): void {
    if (this.max > this.amount) {
      this.amount++;
      this.amountChange.emit(this.amount);
    } else {
      this.maxReached.emit("Se alcanzó el maximo de productos");
    }
  }

  downAmount(): void {
    if (this.amount > 0) {
      this.amount--;
      this.amountChange.emit(this.amount);
    }
  }
}
