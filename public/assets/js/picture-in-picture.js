/**
 * Enhanced Picture-in-Picture functionality for video players
 * Provides automatic PiP activation when video scrolls out of view
 * with intelligent user gesture detection and fallback mechanisms
 */

class PictureInPictureManager {
    constructor(videoElementId = 'video-player_html5_api') {
        this.videoElementId = videoElementId;
        this.userHasInteracted = false;
        this.pipEnabled = false;
        this.isVideoVisible = true;
        this.lastUserEvent = null;
        this.video = null;
        this.observer = null;
        
        this.init();
    }

    /**
     * Initialize the Picture-in-Picture functionality
     */
    init() {
        // Try to setup PiP, retry if video element not ready
        if (!this.setupEnhancedPiP()) {
            // Retry after additional delay if video element not found
            setTimeout(() => {
                this.setupEnhancedPiP();
            }, 1000);
        }
    }

    /**
     * Comprehensive user interaction detection with gesture validation
     */
    enableUserInteractionDetection() {
        // Only direct user gestures that satisfy PiP API requirements
        const directGestureEvents = ['click', 'touchstart', 'keydown', 'mousedown'];
        // Secondary events that indicate user engagement but may not satisfy PiP API
        const engagementEvents = ['scroll', 'wheel'];
        
        let hasDirectGesture = false;
        let hasEngagement = false;
        
        const handleDirectGesture = (event) => {
            hasDirectGesture = true;
            this.userHasInteracted = true;
            this.lastUserEvent = event;
            
            // Remove listeners after first direct gesture
            directGestureEvents.forEach(eventType => {
                document.removeEventListener(eventType, handleDirectGesture, true);
            });
        };
        
        const handleEngagement = (event) => {
            hasEngagement = true;
            
            // Only set userHasInteracted if we also have a direct gesture
            if (hasDirectGesture) {
                this.userHasInteracted = true;
            }
        };
        
        // Add event listeners for direct gestures
        directGestureEvents.forEach(event => {
            document.addEventListener(event, handleDirectGesture, true);
        });
        
        // Add event listeners for engagement
        engagementEvents.forEach(event => {
            document.addEventListener(event, handleEngagement, true);
        });
    }

    /**
     * Show Picture-in-Picture prompt when automatic PiP fails
     */
    showPictureInPicturePrompt() {
        // Don't show prompt if video is fully in view
        if (this.isVideoVisible) {
            return;
        }
        
        if (!document.getElementById('pip-prompt')) {
            const prompt = document.createElement('div');
            prompt.id = 'pip-prompt';
            prompt.innerHTML = 'Click to enable Picture-in-Picture';
            prompt.style.cssText = `
                position: fixed !important;
                top: 60px !important;
                right: 20px !important;
                padding: 12px 20px !important;
                border-radius: 8px !important;
                font-size: 14px !important;
                font-weight: 500 !important;
                z-index: 10000 !important;
                cursor: pointer !important;
                transition: all 0.3s ease !important;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 255, 255, 0.2) !important;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
            `;
            
            prompt.onclick = (event) => {
                this.userHasInteracted = true;
                
                if (this.video) {
                    this.enterPictureInPicture(this.video).then(() => {
                        prompt.remove();
                    }).catch((error) => {
                        prompt.innerHTML = '❌ Picture-in-Picture not available';
                        setTimeout(() => prompt.remove(), 2000);
                    });
                }
            };
            
            // Hover effect
            prompt.onmouseenter = () => {
                prompt.style.background = 'rgba(0, 0, 0, 0.95) !important';
                prompt.style.transform = 'translateY(-2px) !important';
                prompt.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4) !important';
            };
            
            prompt.onmouseleave = () => {
                prompt.style.background = 'rgba(0, 0, 0, 0.9) !important';
                prompt.style.transform = 'translateY(0) !important';
                prompt.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3) !important';
            };
            
            document.body.appendChild(prompt);
            
            // Auto-remove after 8 seconds
            setTimeout(() => {
                if (prompt.parentNode) {
                    prompt.remove();
                }
            }, 8000);
        }
    }

    /**
     * Enter Picture-in-Picture mode
     */
    async enterPictureInPicture(video) {
        try {
            if (video && video.srcObject && !this.pipEnabled) {
                await video.requestPictureInPicture();
                return true;
            }
        } catch (error) {
            throw error;
        }
    }

    /**
     * Exit Picture-in-Picture mode
     */
    async exitPictureInPicture() {
        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
                return true;
            }
        } catch (error) {
            console.log('Could not exit Picture-in-Picture mode:', error);
        }
    }

    /**
     * Attempt Picture-in-Picture with improved gesture handling
     */
    attemptPictureInPicture(video) {
        // Don't attempt PiP if video is fully in view
        if (this.isVideoVisible) {
            return;
        }
        
        if (!this.userHasInteracted) {
            this.showPictureInPicturePrompt();
            return;
        }
        
        // Try to enter PiP within a user gesture context if possible
        if (this.lastUserEvent && this.lastUserEvent.isTrusted) {
            this.enterPictureInPicture(video).catch((error) => {
                this.showPictureInPicturePrompt();
            });
        } else {
            this.enterPictureInPicture(video).catch((error) => {
                this.showPictureInPicturePrompt();
            });
        }
    }

    /**
     * Initialize the enhanced PiP functionality
     */
    setupEnhancedPiP() {
        this.video = document.getElementById(this.videoElementId);
        if (!this.video) {
            return false;
        }

        // Check if Picture-in-Picture is supported
        if (!document.pictureInPictureEnabled) {
            console.log('Picture-in-Picture is not supported in this browser');
            return false;
        }

        // Enable user interaction detection
        this.enableUserInteractionDetection();

        // Setup Intersection Observer with better threshold
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                this.isVideoVisible = entry.isIntersecting;
                
                if (!this.isVideoVisible && !this.pipEnabled && this.video.srcObject) {
                    // Video is out of view, try to enter PiP
                    this.attemptPictureInPicture(this.video);
                } else if (this.isVideoVisible && this.pipEnabled) {
                    // Video is back in view, exit PiP
                    this.exitPictureInPicture();
                } else if (this.isVideoVisible) {
                    // Video is fully in view, remove any existing PiP prompt
                    const existingPrompt = document.getElementById('pip-prompt');
                    if (existingPrompt) {
                        existingPrompt.remove();
                    }
                }
            });
        }, {
            threshold: 0.5 // Trigger when 50% of video is out of view
        });
        
        this.observer.observe(this.video);

        // Listen for PiP events
        this.video.addEventListener('enterpictureinpicture', () => {
            this.pipEnabled = true;
        });
        
        this.video.addEventListener('leavepictureinpicture', () => {
            this.pipEnabled = false;
        });

        // Enable on video play event (which often requires user interaction)
        this.video.addEventListener('play', () => {
            this.userHasInteracted = true;
        });

        // Also detect interaction on video element specifically
        this.video.addEventListener('click', () => {
            this.userHasInteracted = true;
        });
        
        this.video.addEventListener('touchstart', () => {
            this.userHasInteracted = true;
        });

        return true;
    }

    /**
     * Cleanup method to remove event listeners and observers
     */
    async destroy() {
        // Try to exit VideoJS PIP first
        if (this.video && this.video.player) {
            const player = this.video.player;
            
            if (player.isInPictureInPicture && player.isInPictureInPicture()) {
                try {
                    await player.exitPictureInPicture();
                } catch (error) {
                    // Silent error handling
                }
            }
        }
        
        // Exit standard Picture-in-Picture mode if currently active
        if (document.pictureInPictureElement) {
            try {
                await document.exitPictureInPicture();
            } catch (error) {
                // Silent error handling
            }
        }
        
        // Check for any VideoJS players on the page as fallback
        if (window.videojs) {
            const players = window.videojs.getAllPlayers();
            for (let player of players) {
                if (player.isInPictureInPicture && player.isInPictureInPicture()) {
                    try {
                        await player.exitPictureInPicture();
                    } catch (error) {
                        // Silent error handling
                    }
                }
            }
        }
        
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        
        // Remove any existing PiP prompt
        const prompt = document.getElementById('pip-prompt');
        if (prompt) {
            prompt.remove();
        }
        
        // Reset state
        this.pipEnabled = false;
        this.userHasInteracted = false;
        this.isVideoVisible = true;
        this.lastUserEvent = null;
        this.video = null;
    }
}

// Global function to force exit PIP mode
window.forceExitPictureInPicture = async function() {
    // Check for VideoJS player first
    const videoElement = document.getElementById('video-player_html5_api');
    if (videoElement && videoElement.player) {
        const player = videoElement.player;
        
        if (player.isInPictureInPicture && player.isInPictureInPicture()) {
            try {
                await player.exitPictureInPicture();
                return true;
            } catch (error) {
                // Silent error handling
            }
        }
    }
    
    // Fallback to standard browser PIP API
    if (document.pictureInPictureElement) {
        try {
            await document.exitPictureInPicture();
            return true;
        } catch (error) {
            return false;
        }
    }
    
    // Check for any VideoJS players on the page
    if (window.videojs) {
        const players = window.videojs.getAllPlayers();
        for (let player of players) {
            if (player.isInPictureInPicture && player.isInPictureInPicture()) {
                try {
                    await player.exitPictureInPicture();
                    return true;
                } catch (error) {
                    // Silent error handling
                }
            }
        }
    }
    
    return false;
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PictureInPictureManager;
}

// Global usage
if (typeof window !== 'undefined') {
    window.PictureInPictureManager = PictureInPictureManager;
}