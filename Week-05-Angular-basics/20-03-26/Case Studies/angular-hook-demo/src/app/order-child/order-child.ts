import {
  Component,
  Input,
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-child',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-child.html',
  styleUrls: ['./order-child.css']
})
export class OrderChild implements
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {

  @Input() order: any;

  logs: string[] = [];

  addLog(message: string) {
    this.logs.push(message);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.addLog('🔄 ngOnChanges triggered');
  }

  ngOnInit() {
    this.addLog('✅ ngOnInit triggered');
  }

  ngDoCheck() {
    this.addLog('🔍 ngDoCheck triggered');
  }

  ngAfterContentInit() {
    this.addLog('📦 ngAfterContentInit triggered');
  }

  ngAfterContentChecked() {
    this.addLog('📦 ngAfterContentChecked triggered');
  }

  ngAfterViewInit() {
    this.addLog('👁️ ngAfterViewInit triggered');
  }

  ngAfterViewChecked() {
    this.addLog('👁️ ngAfterViewChecked triggered');
  }

  ngOnDestroy() {
    console.log('❌ ngOnDestroy triggered');
  }

}