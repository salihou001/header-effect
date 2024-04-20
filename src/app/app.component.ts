import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import ScrollTrigger from 'gsap/src/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const myEase = CustomEase.create("abouEase", "1.000, 0.005, 0.000, 0.995");

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    ScrollTrigger.create({
      trigger: ".box-container",
      start: "top top",
      endTrigger: "#otherID",
      end: "bottom 50%+=100px",
      onToggle: (self) => console.log("toggled, isActive:", self.isActive),
      onUpdate: (self) => {
        console.log(
          "progress:",
          self.progress.toFixed(3),
          "direction:",
          self.direction,
          "velocity",
          self.getVelocity()
        );
        if (self.direction > 0) {
          const TL = gsap.timeline();
          TL
            .to('.box-container', {
              width: '70%',
              height: '5%',
              top: '20px',
              ease: myEase
            })
            .to('.header_img', {
              borderRadius: '50px',
              ease: myEase
            },"<")
            .to('.text-about,.text-portfolio', {
              opacity: 0,
              y: '*',
              ease: myEase
            }, "<")
            .to('.header', {
              padding: '0 1%',
              top:'10',
              left: '0%',
              x: -'50%',
              y: -'50%',
              marginTop: 0,
            }, "<")
        } else {
          const TL = gsap.timeline();
          TL
            .to('.box-container', {
              width: '100%',
              top: 0,
              height: '100%',
              ease: myEase
            })
            .to('.header_img', {
              borderRadius: '0px',
              ease: myEase
            },"<")
            .to('.circle', {
              y: '-100px',
              opacity: 1,
              ease: myEase
            }, "<")
            .to('.noice', {
              y: '*',
              opacity: 1,
              ease: myEase
            }, "<")
            .to('.header', {
              padding: '0 5%'
            }, "<")
        }
      },
    });
  }
  about(text:string) {
    this.animation(text);
  }

  portfolio(text:string){
    this.animation(text);
  }
  
  animation(text:string){
    const TL = gsap.timeline();
    TL
      .to('.box-container', {
        width: '70%',
        height: '60%',
        ease: myEase
      })
      .to('.header_img', {
        borderRadius: '10px',
        ease: myEase
      },"<")
      .to(`.${text}`, {
        y: '-200px',
        opacity: 1,
        ease: myEase
      }, "<")
      .to('.circle', {
        y: '100px',
        opacity: 0,
        ease: myEase
      }, "<")
      .to('.noice', {
        y: '-20px',
        opacity: 0,
        ease: myEase
      }, "<")
      .to('.header', {
        padding: '0 5%',
      }, "<")
  }
}
