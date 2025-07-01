// Store references to videos and observers for cleanup
let topVideo = null;
let bottomVideo = null;
let intersectionObserver = null;
// Track if videos have been created (only create once)
let videosCreated = false;

// Function to create videos (only called once)
function createVideos() {
  const urlBase = "https://mintlify.s3.us-west-1.amazonaws.com/tonik-a57c11a2/videos/";
  const isLocalHost = window.location.hostname === "localhost" || window.location.hostname === "";
  const url = isLocalHost ? '/videos/extropic-wide' : urlBase + 'extropic-wide';

  console.log("Creating videos...");
  // Skip if videos are already created
  if (videosCreated) {
    return;
  }

  // Additional safety check - remove any existing videos with same IDs
  const existingTopVideo = document.getElementById("background-video");
  const existingBottomVideo = document.getElementById("bottom-video");
  if (existingTopVideo) existingTopVideo.remove();
  if (existingBottomVideo) existingBottomVideo.remove();

  // Create top background video element
  topVideo = document.createElement("video");
  topVideo.id = "background-video";
  topVideo.autoplay = true;
  topVideo.muted = true;
  topVideo.loop = true;
  topVideo.playsInline = true;

  // Style the background video
  topVideo.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        object-fit: cover;
        z-index: 0;
        pointer-events: none;
        transition: opacity 0.5s ease;
    `;

  // Add video source (replace with your video URL)
  topVideo.src = 
    isLocalHost ? '/videos/extropic-wide.mp4' : url + '.mp4';

  // Insert at the beginning of body - with error handling
  try {
    if (document.body.firstChild) {
      document.body.insertBefore(topVideo, document.body.firstChild);
    } else {
      document.body.appendChild(topVideo);
    }
  } catch (error) {
    console.warn("Failed to insert background video, appending instead:", error);
    document.body.appendChild(topVideo);
  }

  // Create bottom video element
  bottomVideo = document.createElement("video");
  bottomVideo.id = "bottom-video";
  bottomVideo.autoplay = true;
  bottomVideo.muted = true;
  bottomVideo.loop = true;
  bottomVideo.playsInline = true;
  bottomVideo.preload = "metadata";

  // Style the bottom video
  bottomVideo.style.cssText = `
        width: 100%;
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px 0;
        transition: opacity 0.5s ease;
    `;

  // Add video source (replace with your video URL)
  bottomVideo.src = "/videos/extropic-footer.mp4";

  // Insert at the end of body
  document.body.appendChild(bottomVideo);

  // Optional: Handle video loading errors
  topVideo.addEventListener("error", function (e) {
    console.warn("Background video failed to load:", e);
  });

  bottomVideo.addEventListener("error", function (e) {
    console.warn("Bottom video failed to load:", e);
  });

  // Optional: Ensure both videos play on mobile and handle autoplay restrictions
  const ensureVideoPlayback = (video, videoName) => {
    video.addEventListener("canplay", function () {
      video.play().catch(function (error) {
        console.warn(`${videoName} autoplay failed:`, error);
      });
    });

    // Force play on user interaction if autoplay was blocked
    const playOnInteraction = () => {
      video.play().catch(function (error) {
        console.warn(`${videoName} manual play failed:`, error);
      });
    };

    document.addEventListener("click", playOnInteraction, { once: true });
    document.addEventListener("touchstart", playOnInteraction, { once: true });
  };

  ensureVideoPlayback(topVideo, "Background video");
  ensureVideoPlayback(bottomVideo, "Bottom video");

  // Hide background video when bottom video becomes visible
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1, // Trigger when 10% of bottom video is visible
  };

  intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === bottomVideo) {
        if (entry.isIntersecting) {
          // Bottom video is visible, hide background video
          topVideo.style.opacity = "0";
          topVideo.style.transition = "opacity 0.5s ease-out";
        } else {
          // Bottom video is not visible, show background video
          topVideo.style.opacity = "1";
          topVideo.style.transition = "opacity 0.5s ease-in";
        }
      }
    });
  }, observerOptions);

  // Start observing the bottom video
  intersectionObserver.observe(bottomVideo);
  
  videosCreated = true;
}

// Function to show videos
function showVideos() {
  if (topVideo) {
    topVideo.style.display = "block";
  }
  if (bottomVideo) {
    bottomVideo.style.display = "block";
  }
}

// Function to hide videos
function hideVideos() {
  if (topVideo) {
    topVideo.style.display = "none";
  }
  if (bottomVideo) {
    bottomVideo.style.display = "none";
  }
}

// Function to check if current path should show videos
function shouldShowVideos() {
  return window.location.pathname.includes("system-overview/");
}

// Function to handle pathname changes
function handlePathnameChange() {
  // Always create videos first (only happens once)
  createVideos();
  
  const shouldShow = shouldShowVideos();
  
  if (shouldShow) {
    showVideos();
  } else {
    hideVideos();
  }
}

// Initial check
handlePathnameChange();

// Set up pathname observer using MutationObserver to watch for URL changes
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function() {
  originalPushState.apply(history, arguments);
  setTimeout(handlePathnameChange, 0);
};

history.replaceState = function() {
  originalReplaceState.apply(history, arguments);
  setTimeout(handlePathnameChange, 0);
};

// Listen for popstate events (back/forward navigation)
window.addEventListener('popstate', handlePathnameChange);

// Also listen for hashchange in case of hash-based routing
window.addEventListener('hashchange', handlePathnameChange);
