import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { projects } from "../data/projects";

gsap.registerPlugin(useGSAP);

const Work = () => {
  useGSAP(() => {
  const workFlex = document.querySelector(".work-flex") as HTMLElement;

  function getTranslateX() {
    // Full overflow width, directly measured — robust regardless of
    // margins/padding on ancestors (the old formula under-counted this).
    return workFlex.scrollWidth - workFlex.clientWidth;
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: () => `+=${getTranslateX()}`,
      scrub: true,
      pin: true,
      id: "work",
      invalidateOnRefresh: true,
    },
  });

  timeline.to(".work-flex", {
    x: () => -getTranslateX(),
    ease: "none",
  });

  // Images load asynchronously; re-measure once everything has settled
  // so the pin's scroll distance always matches the final layout.
  // ScrollSmoother keeps its own internal proxy of total scrollable
  // height — a plain ScrollTrigger.refresh() alone can leave it stale
  // after a pin's distance changes, desyncing nav-link scrollTo targets
  // from where content actually lands. Refresh both explicitly.
  const onLoad = () => {
    ScrollTrigger.refresh();
    ScrollSmoother.get()?.refresh();
  };
  window.addEventListener("load", onLoad);

  return () => {
    window.removeEventListener("load", onLoad);
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.name}
                link={project.link}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
