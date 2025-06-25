// if (window.location.pathname.includes("getting-started/monte-carlo-reformed")) {
//   // Wait for DOM to be fully loaded
//   // Create top background video element
//   const topVideo = document.createElement("video");
//   topVideo.id = "background-video";
//   topVideo.autoplay = true;
//   topVideo.muted = true;
//   topVideo.loop = true;
//   topVideo.playsInline = true;

//   // Style the background video
//   topVideo.style.cssText = `
//         position: fixed;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100vh;
//         object-fit: cover;
//         z-index: -1;
//         pointer-events: none;
//     `;

//   // Add video source (replace with your video URL)
//   topVideo.src = "/videos/extropic-wide.mp4";

//   // Insert at the beginning of body
//   document.body.insertBefore(topVideo, document.body.firstChild);

//   // Create bottom video element
//   const bottomVideo = document.createElement("video");
//   bottomVideo.id = "bottom-video";
//   bottomVideo.autoplay = true;
//   bottomVideo.muted = true;
//   bottomVideo.loop = true;
//   bottomVideo.playsInline = true;
//   bottomVideo.preload = "metadata";

//   // Style the bottom video
//   bottomVideo.style.cssText = `
//         width: 100%;
//         max-width: 100%;
//         height: auto;
//         display: block;
//         margin: 20px 0;
//     `;

//   // Add video source (replace with your video URL)
//   bottomVideo.src = "/videos/extropic-footer.mp4";

//   // Insert at the end of body
//   document.body.appendChild(bottomVideo);

//   // Optional: Handle video loading errors
//   topVideo.addEventListener("error", function (e) {
//     console.warn("Background video failed to load:", e);
//   });

//   bottomVideo.addEventListener("error", function (e) {
//     console.warn("Bottom video failed to load:", e);
//   });

//   // Optional: Ensure both videos play on mobile and handle autoplay restrictions
//   const ensureVideoPlayback = (video, videoName) => {
//     video.addEventListener("canplay", function () {
//       video.play().catch(function (error) {
//         console.warn(`${videoName} autoplay failed:`, error);
//       });
//     });

//     // Force play on user interaction if autoplay was blocked
//     const playOnInteraction = () => {
//       video.play().catch(function (error) {
//         console.warn(`${videoName} manual play failed:`, error);
//       });
//     };

//     document.addEventListener("click", playOnInteraction, { once: true });
//     document.addEventListener("touchstart", playOnInteraction, { once: true });
//   };

//   ensureVideoPlayback(topVideo, "Background video");
//   ensureVideoPlayback(bottomVideo, "Bottom video");

//   // Hide background video when bottom video becomes visible
//   const observerOptions = {
//     root: null,
//     rootMargin: "0px",
//     threshold: 0.1, // Trigger when 10% of bottom video is visible
//   };

//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.target === bottomVideo) {
//         if (entry.isIntersecting) {
//           // Bottom video is visible, hide background video
//           topVideo.style.opacity = "0";
//           topVideo.style.transition = "opacity 0.5s ease-out";
//         } else {
//           // Bottom video is not visible, show background video
//           topVideo.style.opacity = "1";
//           topVideo.style.transition = "opacity 0.5s ease-in";
//         }
//       }
//     });
//   }, observerOptions);

//   // Start observing the bottom video
//   observer.observe(bottomVideo);

//   // Alternative: If you need to run this after all content is loaded (including images)
//   // Replace 'DOMContentLoaded' with 'load' in the event listener above
// }
