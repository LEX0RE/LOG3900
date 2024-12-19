import { AfterViewInit, Component, DoCheck, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'app-bracket-line',
    templateUrl: './bracket-line.component.html',
    styleUrls: ['./bracket-line.component.scss'],
})
export class BracketLineComponent implements AfterViewInit, DoCheck {
    @Input() reverse: boolean;
    @ViewChild('canvas', { static: true }) private canvas!: ElementRef<HTMLCanvasElement>;
    @ViewChild('line') private line!: ElementRef<HTMLDivElement>;
    private context: CanvasRenderingContext2D;

    ngDoCheck(): void {
        if (this.context) {
            this.canvas.nativeElement.width = this.line.nativeElement.clientWidth;
            this.canvas.nativeElement.height = this.line.nativeElement.clientHeight;
            this.draw(this.reverse);
        }
    }

    ngAfterViewInit(): void {
        this.canvas.nativeElement.width = this.line.nativeElement.clientWidth;
        this.canvas.nativeElement.height = this.line.nativeElement.clientHeight;
        this.context = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
        this.draw(this.reverse);
    }

    private draw(reverse: boolean): void {
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
        this.context.beginPath();
        this.createLines(reverse);
        this.context.stroke();
    }

    private createLines(reverse: boolean): void {
        const width = this.canvas.nativeElement.width;
        const height = this.canvas.nativeElement.height;

        const childFactor = 4;
        const firstChild = (height * 1) / childFactor;
        const lastChild = (height * 3) / childFactor;
        const halfWidth = width / 2;
        const maxWidth = width;
        const halfHeight = height / 2;

        this.context.lineWidth = 4;

        this.context.moveTo(halfWidth, firstChild);
        this.context.lineTo(halfWidth, lastChild);

        this.context.moveTo(halfWidth, firstChild);
        this.context.lineTo(reverse ? maxWidth : 0, firstChild);

        this.context.moveTo(halfWidth, lastChild);
        this.context.lineTo(reverse ? maxWidth : 0, lastChild);

        this.context.moveTo(halfWidth, halfHeight);
        this.context.lineTo(reverse ? 0 : maxWidth, halfHeight);
    }
}
