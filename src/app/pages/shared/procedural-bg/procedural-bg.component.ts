import {Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';

interface Particle {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  color: string;
}

@Component({
  selector: 'app-procedural-bg',
  templateUrl: './procedural-bg.component.html',
  styleUrl: './procedural-bg.component.scss'
})
export class ProceduralBgComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', {static: true}) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private width = 0;
  private height = 0;
  private rafId = 0;

  private particles: Particle[] = [];

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D non supporté');
    this.ctx = ctx;

    this.onResize();
    this.initParticles(50); // nombre de particules
    this.loop();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
  }

  @HostListener('window:resize')
  onResize() {
    console.log('resize');
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

  private initParticles(count: number) {
    this.particles = Array.from({length: count}, () => {
      const hue = 100 + Math.random() * 40; // vert clair à vert foncé
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        r: 30 + Math.random() * 50, // rayon
        dx: (Math.random() - 0.5) * 0.5, // vitesse x
        dy: (Math.random() - 0.5) * 0.5, // vitesse y
        color: `hsla(${hue}, 70%, ${30 + Math.random() * 40}%, 0.4)`
      }
    });
  }

  private loop = () => {
    this.draw();
    this.updateParticles();
    this.rafId = requestAnimationFrame(this.loop);
  };

  private updateParticles() {
    for (const p of this.particles) {
      p.x += p.dx;
      p.y += p.dy;
      // rebond simple sur les bords
      if (p.x < 0 || p.x > this.width) p.dx *= -1;
      if (p.y < 0 || p.y > this.height) p.dy *= -1;
    }
  }

  private draw() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);

    ctx.fillStyle = "#7852A9";
    ctx.fillRect(0, 0, this.width, this.height);

    for (const p of this.particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }
}
