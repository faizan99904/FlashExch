import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRateHighlighter]'
})
export class RateHighlighterDirective {

  private observer!: IntersectionObserver;
  private oldValue: any;
  private interval: any;
  private isVisible!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;

        if (this.isVisible) {
          this.checkVals();
        } else {
          clearInterval(this.interval);
          this.interval = null;
        }
      });
    });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.unobserve(this.el.nativeElement);
    this.observer.disconnect();
    clearInterval(this.interval);
    this.interval = null;
  }

  checkVals() {
    if (!this.isVisible) {
      return;
    }

    this.interval = setInterval(() => {
      const classList = this.el.nativeElement.classList;

        if (this.oldValue && this.oldValue !== this.el?.nativeElement?.innerText) {
          this.renderer.addClass(this.el.nativeElement, 'SparkBack');
        } else if (classList.contains('SparkBack')) {
          this.renderer.removeClass(this.el.nativeElement, 'SparkBack');
        }

        this.oldValue = this.el.nativeElement.innerText;
      
    }, 300);

  }

}
