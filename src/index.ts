import { stepSVGParticles } from './exports';
import { 
	fluidOnResize,
	stepFluid,
} from './fluid';
import './interactions';
import MicroModal from 'micromodal';
import {
	particlesOnResize,
	stepParticles,
} from './particles';
import { stepInteraction } from './interactions';
import { hideGUI, showGUI } from './gui';

// Init help modal.
MicroModal.init();

let paused = false;
// Keyboard handlers.
window.addEventListener('keydown', (e: KeyboardEvent) => {
	if (e.code === 'Space') {
		paused = !paused;
		paused ? showGUI() : hideGUI();
	}
});

// Add resize listener.
onResize();
window.addEventListener('resize', onResize);
function onResize() {
	const width = window.innerWidth;
	const height = window.innerHeight;
	particlesOnResize(width, height);
	fluidOnResize(width, height);
}

// Start render loop.
window.requestAnimationFrame(step);
function step() {
	// Start a new render cycle.
	window.requestAnimationFrame(step);

	if (paused) {
		stepSVGParticles();
		return;
	}

	// Apply interactions.
	stepInteraction();

	// Step simulation.
	stepFluid();
	stepParticles();
}