/* DM3008 Generative Art - Week 4
 * Project: Pinwheel
 * Author: Leah Chakola, 2026
 *
 * Inspired by the paper pinwheel toy I played with as a child.
 * 256 small coloured blades are arranged in a circle around the centre
 * and spin slowly, like a pinwheel catching the wind. Sine and cosine
 * make the pattern breathe in and out, Perlin noise makes every blade
 * flutter slightly differently, and modulo creates repeating rhythms
 * in the blade colours, lengths and sizes. A transparent background
 * leaves motion trails, like the blur of a spinning pinwheel.
 *
 * Changes from the template:
 * - Pinwheel theme: rectangle "blades" instead of the original shapes
 * - Modulo 4 gives each blade one of four toy colours
 *   (pink, green, blue, yellow)
 * - Modulo 2 alternates long and short blades
 * - Modulo 3 alternates tall and short blade heights
 * - Perlin noise varies each blade's distance, width and angle
 * - Sine and cosine animate the pattern so it expands and contracts
 * - Rainbow outlines that slowly shift colour over time
 * - Transparent background for motion trails, slow overall rotation
 *
 * Based on the Week 4 template by Ashley Hi (2026).
 */

var magnify = 300; // overall size of the pinwheel
var rotation = 180; // how far each blade is rotated (animated in draw)
var radius = 50; // controls the petal-like pattern (animated in draw)
var elements = 256; // number of blades

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER); // rectangles are drawn from their centre
  colorMode(HSB, 360, 100, 100, 100); // HSB makes colourful gradients easier
}

function draw() {
  // Transparent black background: previous frames fade slowly
  // instead of disappearing, which creates motion trails
  background(0, 0, 0, 15);

  // Sine makes the radius smoothly expand and contract over time
  radius = map(sin(frameCount * 0.01), -1, 1, 2, 12);

  // Cosine adds a second repeating movement at a slightly different speed
  rotation = map(cos(frameCount * 0.008), -1, 1, 2, 10);

  var spacing = TWO_PI / elements; // angle between neighbouring blades

  translate(width * 0.5, height * 0.5); // move the origin to the centre
  rotate(frameCount * 0.002); // slowly spin the whole pinwheel

  // ---------- Pinwheel blades ----------
  for (var i = 0; i < elements; i++) {
    // Noise gives each blade a smooth, slightly different variation
    var n = noise(i * 0.05, frameCount * 0.01);

    // Modulo 2: blades alternate long, short, long, short
    var sizeChange;
    if (i % 2 == 0) {
      sizeChange = magnify;
    } else {
      sizeChange = magnify * 0.6;
    }

    // How far the blade sits from the centre: the sine wave creates the
    // petal pattern and the noise makes it flutter
    var distance = sin(spacing * i * radius) * sizeChange * (0.7 + n * 0.5);

    // Modulo 4: blades cycle through four toy colours
    var colourChoice = i % 4;
    if (colourChoice == 0) {
      fill(330, 70, 100, 60); // pink
    } else if (colourChoice == 1) {
      fill(120, 60, 100, 60); // green
    } else if (colourChoice == 2) {
      fill(210, 70, 100, 60); // blue
    } else {
      fill(50, 80, 100, 60); // yellow
    }

    // Outline hue depends on the blade number and time,
    // so a rainbow slowly travels around the pinwheel
    stroke((i * 2 + frameCount * 0.5) % 360, 80, 100, 70);

    push();
    rotate(spacing * i * rotation); // place the blade around the circle
    translate(distance, 0); // push it out from the centre

    // Noise varies the blade width
    var rectWidth = 20 + n * 70;

    // Modulo 3: blade heights go tall, short, short, tall, short, short
    var rectHeight;
    if (i % 3 == 0) {
      rectHeight = 25;
    } else {
      rectHeight = 10;
    }

    // Noise tilts each blade, like paper fluttering in the wind
    rotate(noise(i * 0.1, frameCount * 0.02) * PI);

    rect(0, 0, rectWidth, rectHeight);
    pop();
  }
}
