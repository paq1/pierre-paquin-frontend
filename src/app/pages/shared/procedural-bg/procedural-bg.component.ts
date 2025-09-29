import { Component, ElementRef, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-procedural-bg',
  templateUrl: './procedural-bg.component.html',
  styleUrl: './procedural-bg.component.scss'
})
export class ProceduralBgComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private rafId = 0;
  private t = 0;

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D non supporté');
    this.ctx = ctx;
    this.onResize();
    this.loop();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
  }

  @HostListener('window:resize')
  onResize() {
    const canvas = this.canvasRef.nativeElement;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = this.width * dpr;
    canvas.height = this.height * dpr;
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  private loop = () => {
    this.t += 0.01;
    this.draw();
    this.rafId = requestAnimationFrame(this.loop);
  };

  private draw() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // fond animé avec gradient simple (test)
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, `hsl(${(this.t * 40) % 360}, 80%, 50%)`);
    g.addColorStop(1, `hsl(${(this.t * 40 + 120) % 360}, 80%, 50%)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }
}
