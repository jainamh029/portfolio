import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitText;
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

let refreshListenerAttached = false;

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  // "top X%" fires once the section's top has scrolled to X% down the
  // viewport. Must resolve before "top top" (0%) — that's what nav-link
  // clicks and direct-jump scrolling target — or the reveal never plays
  // and the text sits at its pre-animation opacity:0 forever. The old
  // desktop value ("20% 60%", a two-axis threshold keyed to section
  // height) could resolve *after* "top top" on a short section, which is
  // exactly what left the About paragraph invisible on a fresh visit.
  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "top 75%";
  // The reveal tween runs on real time (duration: 1), not scroll-scrub, so a
  // fast scroll can cross this trigger's start AND end within a single
  // ScrollTrigger update tick. "play pause resume reverse" then fires
  // onEnter (play) immediately followed by onLeave (pause) in that same
  // tick, freezing the tween at progress 0 — i.e. permanently opacity:0 —
  // before it has had any real time to animate. "play none none none"
  // reveals once and never pauses/reverses it, so a fast scroll-through
  // still finishes the reveal instead of getting stuck invisible.
  const ToggleAction = "play none none none";

  paras.forEach((para: ParaElement) => {
    para.classList.add("visible");
    // Once a reveal has actually finished, leave it alone. Re-splitting and
    // recreating the tween re-renders its {autoAlpha:0} "from" state
    // immediately (immediateRender defaults to true), flashing already-
    // visible text back to invisible for no reason on every later refresh.
    if (para.anim && para.anim.progress() === 1) return;
    if (para.anim) {
      para.anim.progress(1).kill();
      para.split?.revert();
    }

    para.split = new SplitText(para, {
      type: "lines,words",
      linesClass: "split-line",
    });

    para.anim = gsap.fromTo(
      para.split.words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });
  titles.forEach((title: ParaElement) => {
    if (title.anim && title.anim.progress() === 1) return;
    if (title.anim) {
      title.anim.progress(1).kill();
      title.split?.revert();
    }
    title.split = new SplitText(title, {
      type: "chars,lines",
      linesClass: "split-line",
    });
    title.anim = gsap.fromTo(
      title.split.chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  // Register this exactly once, ever. setSplitText() re-runs on every
  // ScrollTrigger refresh (window resize, other components' load-triggered
  // refreshes, ScrollSmoother syncing) — registering the listener here
  // unconditionally added a NEW listener on every one of those re-runs,
  // so each subsequent refresh fired setSplitText() one extra time per
  // prior refresh (1, 2, 4, 8, ...). That cascade re-created every
  // reveal tween (and re-rendered its invisible "from" state) far faster
  // than the 1s reveal could finish, which is what left text stuck
  // invisible on real page loads with several early refreshes.
  if (!refreshListenerAttached) {
    refreshListenerAttached = true;
    ScrollTrigger.addEventListener("refresh", () => setSplitText());
  }
}
