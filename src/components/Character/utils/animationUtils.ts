import * as THREE from "three";
import { GLTF } from "three-stdlib";

const setAnimations = (gltf: GLTF) => {
  let character = gltf.scene;
  let mixer = new THREE.AnimationMixer(character);
  let idleAction: THREE.AnimationAction | null = null;

  if (gltf.animations?.length) {
    const idleClip = THREE.AnimationClip.findByName(gltf.animations, "Idle");
    if (idleClip) {
      idleAction = mixer.clipAction(idleClip);
      idleAction.play();
    }
  }

  function startIntro() {
    const waveClip = THREE.AnimationClip.findByName(gltf.animations, "Wave");
    if (waveClip && idleAction) {
      const waveAction = mixer.clipAction(waveClip);
      waveAction.setLoop(THREE.LoopOnce, 1);
      waveAction.clampWhenFinished = true;
      idleAction.fadeOut(0.3);
      waveAction.reset().fadeIn(0.3).play();
      const onFinished = (e: { action: THREE.AnimationAction }) => {
        if (e.action === waveAction) {
          waveAction.fadeOut(0.4);
          idleAction!.reset().fadeIn(0.4).play();
          mixer.removeEventListener("finished", onFinished);
        }
      };
      mixer.addEventListener("finished", onFinished);
    }
  }

  function hover(gltf: GLTF, hoverDiv: HTMLDivElement) {
    const thumbsUpClip = THREE.AnimationClip.findByName(
      gltf.animations,
      "ThumbsUp"
    );
    if (!hoverDiv || !thumbsUpClip || !idleAction) return () => {};
    let isHovering = false;
    const thumbsUpAction = mixer.clipAction(thumbsUpClip);
    thumbsUpAction.setLoop(THREE.LoopOnce, 1);
    thumbsUpAction.clampWhenFinished = true;
    const onHoverFace = () => {
      if (isHovering) return;
      isHovering = true;
      idleAction!.fadeOut(0.3);
      thumbsUpAction.reset().fadeIn(0.3).play();
    };
    const onLeaveFace = () => {
      if (!isHovering) return;
      isHovering = false;
      thumbsUpAction.fadeOut(0.3);
      idleAction!.reset().fadeIn(0.3).play();
    };
    hoverDiv.addEventListener("mouseenter", onHoverFace);
    hoverDiv.addEventListener("mouseleave", onLeaveFace);
    return () => {
      hoverDiv.removeEventListener("mouseenter", onHoverFace);
      hoverDiv.removeEventListener("mouseleave", onLeaveFace);
    };
  }

  return { mixer, startIntro, hover };
};

export default setAnimations;
