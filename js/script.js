
const allCampusSearchRecords = [
    {
        title: "CHMSU Intramurals 2026",
        keywords: "events sports campus October 26 basketball volleyball",
        type: "Event",
        href: "events.html#event-intramurals"
    },
    {
        title: "CHMSU Student Innovation Fair",
        keywords: "event innovation projects technology students",
        type: "Event",
        href: "events.html#event-innovation-fair"
    },
    {
        title: "CaVocals Auditions",
        keywords: "event singing music performing arts October 24",
        type: "Event",
        href: "events.html#event-cavocals"
    },
    {
        title: "Basketball Tryouts",
        keywords: "sports intramurals October 19 22 lineup",
        type: "Tryout",
        href: "events.html#tryout-basketball"
    },
    {
        title: "Volleyball Tryouts",
        keywords: "sports intramurals October 19 22 lineup",
        type: "Tryout",
        href: "events.html#tryout-volleyball"
    },
    {
        title: "Campus Creatives & Event Volunteers",
        keywords: "photography design posters writing social media coordination",
        type: "Opportunity",
        href: "events.html#participation-opportunities"
    },
    {
        title: "CHMSU Python Esports Club",
        keywords: "organization esports gaming competition",
        type: "Organization",
        href: "organizations.html#org-pythons"
    },
    {
        title: "IT Society",
        keywords: "organization information technology academic students",
        type: "Organization",
        href: "organizations.html#org-it-society"
    },
    {
        title: "The Technopacer",
        keywords: "organization student publication journalism media",
        type: "Organization",
        href: "organizations.html#org-technopacer"
    },
    {
        title: "CaVocals",
        keywords: "organization singing performing arts choir",
        type: "Organization",
        href: "organizations.html#org-cavocals"
    },
    {
        title: "Artisan's Society",
        keywords: "organization arts crafts creative",
        type: "Organization",
        href: "organizations.html#org-artisans"
    },
    {
        title: "Red Cross Youth Alijis",
        keywords: "organization service support volunteers",
        type: "Organization",
        href: "organizations.html#org-red-cross-youth"
    },
    {
        title: "CPF",
        keywords: "organization service support",
        type: "Organization",
        href: "organizations.html#org-cpf"
    },
    {
        title: "CHMSU University Student Government - CUSG",
        keywords: "organization student government leadership",
        type: "Organization",
        href: "organizations.html#org-cusg"
    },
    {
        title: "Basketball Intramurals MVP",
        keywords: "achievement Arron Sartorio sports",
        type: "Achievement",
        href: "achievements.html#achievement-arron-mvp"
    },
    {
        title: "Mobile Legends Intramurals MVP",
        keywords: "achievement Ferlouie Baylon esports gaming",
        type: "Achievement",
        href: "achievements.html#achievement-ferlouie-ml"
    },
    {
        title: "Volleyball Intramurals MVP",
        keywords: "achievement Jersli Caba sports",
        type: "Achievement",
        href: "achievements.html#achievement-jersli-volleyball"
    },
    {
        title: "Academic Excellence",
        keywords: "achievement Ferlouie Baylon academic",
        type: "Achievement",
        href: "achievements.html#achievement-ferlouie-academic"
    },
    {
        title: "International IT Competition — First Runner-Up",
        keywords: "achievement Jersli Caba Technopacer technology",
        type: "Achievement",
        href: "achievements.html#achievement-jersli-it-competition"
    },
    {
        title: "International IT Competition — First Place",
        keywords: "achievement Jersli Caba Technopacer technology",
        type: "Achievement",
        href: "achievements.html#achievement-jersli-it-competition"
    },
    {
        title: "Students Connect (SCon)",
        keywords: "achievement student project Technopacer",
        type: "Achievement",
        href: "achievements.html#achievement-scon-project"
    },
    {
        title: "Intramurals Tryout Lineup Update",
        keywords: "announcement CHMSU Sports Affairs October 22 5 PM",
        type: "Announcement",
        href: "discover.html#post-tryout-lineup"
    },
    {
        title: "Intramurals Tryout Announcement",
        keywords: "announcement CHMSU Sports Affairs basketball volleyball",
        type: "Announcement",
        href: "discover.html#post-intramurals-tryouts"
    },
    {
        title: "CaVocals Welcomes New Voices",
        keywords: "announcement audition singing performance",
        type: "Announcement",
        href: "discover.html#post-cavocals-auditions"
    },
];

function normalizeSearchText(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function renderGlobalSearch(input, results) {
    const query = normalizeSearchText(input.value.trim());
    results.replaceChildren();
    results.hidden = !query;
    if (!query) return;

    const matches = allCampusSearchRecords.filter(record =>
        normalizeSearchText(`${record.title} ${record.keywords} ${record.type}`).includes(query)
    );

    if (!matches.length) {
        const empty = document.createElement("p");
        empty.className = "discover-search-empty";
        empty.textContent = "No matches found. Try an event, organization, or achievement.";
        results.appendChild(empty);
        return;
    }

    const isDiscover = input.id === "discover-search";
    matches.forEach(record => {
        const link = document.createElement("a");
        const title = document.createElement("strong");
        const detail = document.createElement("span");
        link.className = isDiscover ? "discover-result" : "home-search-destination";
        link.href = record.href;
        title.textContent = record.title;
        detail.textContent = `${record.type} · Open page`;
        link.append(title, detail);
        results.appendChild(link);
    });
}

const homeSearch = document.getElementById("update-search");
const discoverSearch = document.getElementById("discover-search");

if (homeSearch) {
    let results = document.getElementById("home-search-destinations");
    if (!results) {
        results = document.createElement("div");
        results.id = "home-search-destinations";
        results.className = "home-search-destinations";
        results.hidden = true;
        homeSearch.closest(".hero-search").insertAdjacentElement("afterend", results);
    }
    homeSearch.addEventListener("input", () => renderGlobalSearch(homeSearch, results));
}

if (discoverSearch) {
    const results = document.getElementById("discover-search-results");
    if (results) discoverSearch.addEventListener("input", () => renderGlobalSearch(discoverSearch, results));
}

const campusPosts = document.querySelectorAll(".update-card[data-post-id]");
if (campusPosts.length) {
    const readStore = key => {
        try {
            return JSON.parse(localStorage.getItem(key) || "{}");
        } catch {
            return {};
        }
    };
    const writeStore = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {}
    };
    const savedLikes = readStore("scon-post-likes");
    const savedComments = readStore("scon-post-comments");
    campusPosts.forEach(card => {
        const postId = card.dataset.postId;
        const likeButton = card.querySelector(".like-action");
        const likeCount = card.querySelector(".like-count");
        const commentButton = card.querySelector(".comment-action");
        const commentsPanel = card.querySelector(".post-comments");
        const commentList = card.querySelector(".comment-list");
        const commentForm = card.querySelector(".comment-form");
        const shareButton = card.querySelector(".share-action");
        const baseCount = Number(likeCount?.textContent || 0);
        const renderLike = () => {
            const liked = Boolean(savedLikes[postId]);
            if (likeButton) {
                likeButton.setAttribute("aria-pressed", String(liked));
                likeButton.querySelector("span").textContent = liked ? "♥" : "♡";
            }
            if (likeCount) {
                likeCount.textContent = String(baseCount + (liked ? 1 : 0));
            }
        };
        const renderComments = () => {
            if (!commentList) return;
            commentList.replaceChildren();
            (savedComments[postId] || []).forEach(text => {
                const item = document.createElement("div");
                const author = document.createElement("strong");
                const message = document.createElement("span");

                item.className = "post-comment";
                author.textContent = "You";
                message.textContent = text;
                item.append(author, message);
                commentList.appendChild(item);
            });
        };
        renderLike();
        renderComments();
        likeButton?.addEventListener("click", () => {
            savedLikes[postId] = !savedLikes[postId];
            writeStore("scon-post-likes", savedLikes);
            renderLike();
        });
        commentButton?.addEventListener("click", () => {
            const open = commentsPanel.hidden;
            commentsPanel.hidden = !open;
            commentButton.setAttribute("aria-expanded", String(open));
            if (open) commentsPanel.querySelector("input")?.focus();
        });
        commentForm?.addEventListener("submit", event => {
            event.preventDefault();
            const input = commentForm.querySelector("input");
            const text = input.value.trim();
            if (!text) return;
            savedComments[postId] = savedComments[postId] || [];
            savedComments[postId].push(text);
            writeStore("scon-post-comments", savedComments);
            renderComments();
            commentForm.reset();
        });
        shareButton?.addEventListener("click", async () => {
            const shareData = {
                title: card.querySelector("h3")?.textContent || "SCon Campus Update",
                text: "Check out this campus update on SCon.",
                url: new URL(
                    card.querySelector(".update-card-footer a")?.getAttribute("href") || "home.html",
                    window.location.href
                ).href
            };
            try {
                if (navigator.share) await navigator.share(shareData);
                else if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(shareData.url);
                else window.prompt("Copy this link:", shareData.url);
            } catch (error) {
                if (error.name !== "AbortError") window.prompt("Copy this link:", shareData.url);
            }
        });
    });
}

const orgFilterButtons = document.querySelectorAll(".org-filter");
const orgCards = document.querySelectorAll(".org-card");
const orgResults = document.querySelector(".org-results");
const orgEmpty = document.querySelector(".org-empty");

orgFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory = button.dataset.orgFilter;
        let visibleCount = 0;

        orgFilterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active");
            filterButton.setAttribute("aria-pressed", "false");
        });

        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");

        orgCards.forEach(function (card) {
            const cardCategory = card.dataset.orgCategory;

            if (
                selectedCategory === "all" ||
                selectedCategory === cardCategory
            ) {
                card.hidden = false;
                visibleCount++;
            } else {
                card.hidden = true;
            }
        });

        if (orgResults) {
            orgResults.textContent =
                "Showing " + visibleCount +
                (visibleCount === 1
                    ? " organization"
                    : " organizations");
        }

        if (orgEmpty) {
            orgEmpty.hidden = visibleCount !== 0;
        }
    });
});

const recognitionButtons = document.querySelectorAll(".recognition-toggle");
const achievementModal = document.getElementById("achievement-modal");

if (achievementModal) {
    const dialog = achievementModal.querySelector(".achievement-modal");
    const closeButton = achievementModal.querySelector(".achievement-modal-close");
    const video = achievementModal.querySelector(".achievement-modal-video");
    const gallery = achievementModal.querySelector(".achievement-gallery");
    const modalStill = achievementModal.querySelector(".achievement-modal-still");
    const previousImageButton = achievementModal.querySelector(".achievement-gallery-previous");
    const nextImageButton = achievementModal.querySelector(".achievement-gallery-next");
    const imageCount = achievementModal.querySelector(".achievement-gallery-count");
    const modalTitle = achievementModal.querySelector("#achievement-modal-title");
    const modalKicker = achievementModal.querySelector(".achievement-modal-kicker");
    const mediaCaption = achievementModal.querySelector(".achievement-video-caption");
    const modalDescription = achievementModal.querySelector("#achievement-modal-description");
    const modalAwardee = achievementModal.querySelector(".achievement-modal-awardee");
    const modalCategory = achievementModal.querySelector(".achievement-modal-category");
    const modalHighlights = achievementModal.querySelector(".achievement-modal-highlights");
    const likeButton = achievementModal.querySelector(".achievement-like-button");
    const likeTotal = achievementModal.querySelector(".achievement-like-total");
    const commentTotal = achievementModal.querySelector(".achievement-comment-total");
    const commentInput = achievementModal.querySelector("#achievement-comment-input");
    const commentList = achievementModal.querySelector(".achievement-comments");
    const commentForm = achievementModal.querySelector(".achievement-comment-form");
    const shareStatus = achievementModal.querySelector(".achievement-share-status");
    let activeTrigger = null;
    let baseLikes = 18;
    let currentComments = [];
    let galleryImages = [];
    let activeImageIndex = 0;
    let galleryLoadToken = 0;
    let touchStartX = null;

    const studentComments = {
        "arron-mvp": [
            {
                author: "Alyssa P.",
                message: "That last stretch was intense. Great work keeping the team together!"
            },
            {
                author: "Marco D.",
                message: "Well deserved, Arron. You showed up every game."
            }
        ],
        "ferlouie-ml": [
            {
                author: "J. Rivera",
                message: "Those rotations were so clean. Well played, Ferlouie!"
            },
            {
                author: "Nica S.",
                message: "The teamwork in those matches was great to watch. Congrats!"
            }
        ],
        "jersli-volleyball": [
            {
                author: "Paolo M.",
                message: "Strong attacks and solid defense all tournament. Congrats, Jersli!"
            },
            {
                author: "Kaye L.",
                message: "You made every rally exciting. Great season!"
            }
        ],
        "ferlouie-academic": [
            {
                author: "Alyssa P.",
                message: "Your consistency is inspiring. Congratulations on the achievement!"
            }
        ],
        "jersli-it-competition": [
            {
                author: "Marco D.",
                message: "Your problem-solving really showed. Congratulations on the result!"
            }
        ],
        "scon-project": [
            {
                author: "IT Society",
                message: "Congratulations on launching SCon! It’s great to see students bring campus organizations and activities together in one place."
            },
            {
                author: "Nica S.",
                message: "Congrats to the team! I’m excited to use this to keep up with campus events."
            }
        ]
    };

    const storedComments = readStoredComments();

    function readStoredComments() {
        try {
            return JSON.parse(localStorage.getItem("scon-achievement-comments") || "{}");
        } catch {
            return {};
        }
    }

    function formatCount(count) {
        return new Intl.NumberFormat().format(count);
    }

    function updateCounts() {
        likeTotal.textContent = formatCount(baseLikes) + " likes";
        commentTotal.textContent = formatCount(currentComments.length);
    }

    const renderComments = () => {
        commentList.replaceChildren();

        currentComments.forEach((comment, index) => {
            const item = document.createElement("div");
            const avatar = document.createElement("span");
            const bubble = document.createElement("p");
            const name = document.createElement("strong");

            item.className = "achievement-user-comment";
            avatar.className = "achievement-comment-avatar";
            avatar.textContent = comment.author
                .split(/\s+/)
                .map(part => part.replace(/[^A-Za-z]/g, "")[0] || "")
                .join("")
                .slice(0, 2)
                .toUpperCase();
            avatar.dataset.tone = String(index % 4);
            avatar.setAttribute("aria-hidden", "true");
            bubble.className = "achievement-comment-bubble";
            name.textContent = comment.author;
            bubble.append(name, document.createTextNode(" " + comment.message));
            item.append(avatar, bubble);
            commentList.append(item);
        });

        updateCounts();
    };

    function renderGalleryImage() {
        const imagePath = galleryImages[activeImageIndex];

        if (!imagePath) {
            modalStill.removeAttribute("src");
            imageCount.hidden = true;
            previousImageButton.hidden = true;
            nextImageButton.hidden = true;
            return;
        }

        modalStill.src = imagePath;
        modalStill.alt = "Achievement image " + (activeImageIndex + 1);
        imageCount.textContent = (activeImageIndex + 1) + " / " + galleryImages.length;
        imageCount.hidden = galleryImages.length < 2;
        previousImageButton.hidden = galleryImages.length < 2;
        nextImageButton.hidden = galleryImages.length < 2;
    }

    function preloadGalleryImage(imagePath) {
        return new Promise(resolve => {
            const image = new Image();

            image.onload = () => resolve(imagePath);
            image.onerror = () => resolve(null);
            image.src = imagePath;
        });
    }

    function showPreviousImage() {
        if (galleryImages.length < 2) return;

        activeImageIndex = (activeImageIndex - 1 + galleryImages.length) % galleryImages.length;
        renderGalleryImage();
    }

    function showNextImage() {
        if (galleryImages.length < 2) return;

        activeImageIndex = (activeImageIndex + 1) % galleryImages.length;
        renderGalleryImage();
    }

    function showAchievementMedia(card, cardImage) {
        galleryLoadToken += 1;
        video.pause();

        if (card.dataset.awardVideo) {
            gallery.hidden = true;
            video.hidden = false;
            video.autoplay = true;
            video.muted = false;
            video.src = card.dataset.awardVideo;
            video.load();
            const playRequest = video.play();
            if (playRequest) playRequest.catch(() => {});
            return;
        }

        video.removeAttribute("src");
        video.autoplay = false;
        video.load();
        video.hidden = true;
        gallery.hidden = false;

        const requestedImages = card.dataset.galleryImages
            ? card.dataset.galleryImages.split(/\s+/).filter(Boolean)
            : [cardImage?.getAttribute("src") || ""];
        const requestToken = galleryLoadToken;
        galleryImages = [cardImage?.getAttribute("src") || requestedImages[0] || ""]
            .filter(Boolean);
        activeImageIndex = 0;

        if (galleryImages.length) {
            renderGalleryImage();
        }

        Promise.all(requestedImages.map(preloadGalleryImage)).then(images => {
            if (requestToken !== galleryLoadToken || achievementModal.hidden) return;

            galleryImages = images.filter(Boolean);
            activeImageIndex = 0;
            renderGalleryImage();
        });
    }

    function openAchievement(button) {
        const card = button.closest(".recognition-card");
        if (!card) return;

        activeTrigger = button;
        modalTitle.textContent = card.querySelector(".recognition-content h3")?.textContent.trim() || "Student achievement";
        modalAwardee.textContent = [
            card.querySelector(".awardee-name")?.textContent.trim(),
            card.querySelector(".awardee-course")?.textContent.trim()
        ]
            .filter(Boolean)
            .join(" · ");
        modalCategory.textContent = card.querySelector(".recognition-category")?.textContent.trim() || "CAMPUS RECOGNITION";
        const description = card.querySelector(".recognition-description")?.textContent.trim() || "A student achievement shared with the SCon community.";
        const details = card.querySelector(".recognition-more > p")?.textContent.trim()
            || "This recognition reflects practice, learning, and the effort behind the achievement.";
        modalDescription.textContent = description + " " + details;
        modalHighlights.replaceChildren();

        card.querySelectorAll(".achievement-stats div").forEach(stat => {
            const item = document.createElement("div");
            const strong = document.createElement("strong");
            const label = document.createElement("span");

            strong.textContent = stat.querySelector("strong")?.textContent.trim() || "";
            label.textContent = stat.querySelector("span")?.textContent.trim() || "";
            item.append(strong, label);
            modalHighlights.append(item);
        });

        const avatar = achievementModal.querySelector(".achievement-modal-avatar");
        const cardImage = card.querySelector(".recognition-image img");
        const publisher = card.dataset.publisher || "SCon";

        avatar.src = card.dataset.publisherAvatar || "../images/SV Favicon.png";
        avatar.alt = "";
        modalKicker.textContent = publisher + " · Achievement story";
        mediaCaption.textContent = publisher + " · Achievement moment";
        showAchievementMedia(card, cardImage);

        const sourcePost = document.querySelector('.update-card[data-post-id="student-highlights"]');
        baseLikes = Number(sourcePost?.querySelector(".like-count")?.textContent) || 18;
        const achievementId = card.dataset.achievementId || modalTitle.textContent;
        const savedComments = storedComments[achievementId] || [];
        const commentsFromStudents = studentComments[achievementId] || [];

        currentComments = [
            ...commentsFromStudents,
            ...savedComments.map(message => ({ author: "You", message }))
        ];
        likeButton.setAttribute("aria-pressed", "false");
        likeButton.classList.remove("is-liked");
        likeButton.querySelector("span").textContent = "♡";
        commentInput.value = "";
        shareStatus.textContent = "";
        renderComments();

        achievementModal.hidden = false;
        document.body.classList.add("achievement-modal-open");
        document.addEventListener("keydown", onModalKeydown);
        closeButton.focus();
    }

    function closeAchievement() {
        if (achievementModal.hidden) return;

        achievementModal.hidden = true;
        galleryLoadToken += 1;
        document.body.classList.remove("achievement-modal-open");
        document.removeEventListener("keydown", onModalKeydown);
        video.pause();
        if (video.currentSrc) video.currentTime = 0;
        video.removeAttribute("src");
        video.load();
        if (activeTrigger) activeTrigger.focus();
    }

    function onModalKeydown(event) {
        if (event.key === "Escape") {
            closeAchievement();
            return;
        }

        if (event.key === "ArrowLeft") {
            if (!gallery.hidden) showPreviousImage();
            return;
        }

        if (event.key === "ArrowRight") {
            if (!gallery.hidden) showNextImage();
            return;
        }

        if (event.key !== "Tab") return;

        const focusable = Array.from(
            dialog.querySelectorAll("button:not(:disabled):not([hidden]), input:not(:disabled), video[controls]:not([hidden])")
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    recognitionButtons.forEach(button => button.addEventListener("click", () => openAchievement(button)));
    closeButton.addEventListener("click", closeAchievement);
    previousImageButton.addEventListener("click", showPreviousImage);
    nextImageButton.addEventListener("click", showNextImage);
    achievementModal.addEventListener("click", event => {
        if (event.target === achievementModal) closeAchievement();
    });

    likeButton.addEventListener("click", () => {
        const liked = likeButton.getAttribute("aria-pressed") !== "true";
        likeButton.setAttribute("aria-pressed", String(liked));
        likeButton.classList.toggle("is-liked", liked);
        likeButton.querySelector("span").textContent = liked ? "♥" : "♡";
        likeTotal.textContent = formatCount(baseLikes + (liked ? 1 : 0)) + " likes";
    });

    achievementModal.querySelector(".achievement-comment-focus").addEventListener("click", () => commentInput.focus());
    commentForm.addEventListener("submit", event => {
        event.preventDefault();
        const text = commentInput.value.trim();
        if (!text) {
            commentInput.focus();
            return;
        }

        const key = activeTrigger?.closest(".recognition-card")?.dataset.achievementId || modalTitle.textContent;
        currentComments.push({ author: "You", message: text });
        storedComments[key] = storedComments[key] || [];
        storedComments[key].push(text);
        try {
            localStorage.setItem("scon-achievement-comments", JSON.stringify(storedComments));
        } catch {}

        renderComments();
        commentInput.value = "";
    });

    gallery.addEventListener("touchstart", event => {
        touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    gallery.addEventListener("touchend", event => {
        if (touchStartX === null) return;

        const distance = event.changedTouches[0].clientX - touchStartX;
        touchStartX = null;

        if (distance > 50) showPreviousImage();
        if (distance < -50) showNextImage();
    }, { passive: true });

    achievementModal.querySelector(".achievement-share-button").addEventListener("click", async () => {
        const shareData = {
            title: modalTitle.textContent,
            text: "See this achievement story on SCon.",
            url: window.location.href.split("#")[0]
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                shareStatus.textContent = "Story shared.";
            } else if (navigator.clipboard?.writeText) {
                await navigator.clipboard.writeText(shareData.url);
                shareStatus.textContent = "Page link copied.";
            } else {
                shareStatus.textContent = "Copy the page address to share this story.";
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                shareStatus.textContent = "Sharing is unavailable right now.";
            }
        }
    });
}


function renderPageSuggestions(input, results, records) {
    const query = normalizeSearchText(input.value.trim());
    results.replaceChildren();
    results.hidden = !query;
    if (!query) return;

    const matches = records.filter(record =>
        normalizeSearchText(`${record.title} ${record.text}`).includes(query)
    );

    if (!matches.length) {
        const empty = document.createElement("span");
        empty.className = "page-search-empty";
        empty.textContent = "No matching items on this page.";
        results.appendChild(empty);
        return;
    }

    matches.forEach(record => {
        const link = document.createElement("a");
        link.href = record.href;
        link.textContent = record.title;
        results.appendChild(link);
    });
}

(function () {
    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.type = "button";
    topButton.textContent = "↑";
    topButton.setAttribute("aria-label", "Back to top");
    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(topButton);
    window.addEventListener("scroll", function () {
        topButton.classList.toggle("visible", window.scrollY > 350);
    }, { passive: true });

    const eventTrack = document.getElementById("event-carousel-track");
    const previousEvent = document.querySelector(".carousel-previous");
    const nextEvent = document.querySelector(".carousel-next");
    if (eventTrack && previousEvent && nextEvent) {
        previousEvent.addEventListener("click", function () {
            eventTrack.scrollBy({ left: -eventTrack.clientWidth, behavior: "smooth" });
        });
        nextEvent.addEventListener("click", function () {
            eventTrack.scrollBy({ left: eventTrack.clientWidth, behavior: "smooth" });
        });
    }

    const signupForms = document.querySelectorAll(".tryout-signup-form");
    if (signupForms.length) {
        signupForms.forEach(signupForm => {
            const signupResponse = signupForm.querySelector(".signup-response");

            if (!signupResponse) return;

            signupForm.addEventListener("submit", function (event) {
                event.preventDefault();
                const studentName = signupForm.elements.namedItem("name").value.trim();
                const signupType = signupForm.dataset.signupType;

                signupResponse.textContent = signupType === "cavocals-audition"
                    ? "Thanks, " + studentName + ". Check the Events page for CaVocals audition updates and next steps."
                    : "Thanks, " + studentName + ". The tryout lineup will be posted on the Events page on October 22 at 5:00 PM.";
                signupResponse.hidden = false;
                signupForm.querySelector("button[type=submit]").focus();
            });
        });
    }

    const eventDetails = document.querySelectorAll(".event-more");
    if (eventDetails.length) {
        const signupDialog = document.createElement("dialog");
        const dialogHeader = document.createElement("div");
        const dialogHeading = document.createElement("h2");
        const closeDialog = document.createElement("button");
        const dialogContent = document.createElement("div");
        let contentPlaceholder = null;

        signupDialog.className = "event-signup-dialog";
        signupDialog.setAttribute("aria-labelledby", "event-signup-dialog-title");
        dialogHeader.className = "event-signup-dialog-header";
        dialogHeading.id = "event-signup-dialog-title";
        dialogHeader.appendChild(dialogHeading);
        closeDialog.className = "event-signup-dialog-close";
        closeDialog.type = "button";
        closeDialog.setAttribute("aria-label", "Close sign-up details");
        closeDialog.textContent = "×";
        dialogHeader.appendChild(closeDialog);
        dialogContent.className = "event-signup-dialog-content";
        signupDialog.append(dialogHeader, dialogContent);
        document.body.appendChild(signupDialog);

        document.addEventListener("click", event => {
            const summary = event.target.closest(".event-more > summary");
            if (!summary) return;

            event.preventDefault();
            const details = summary.closest(".event-more");
            const card = summary.closest(".event-info-card");
            const content = details.querySelector(".event-more-content");
            if (!content) return;

            dialogHeading.textContent = card?.querySelector("h2, h3")?.textContent.trim() || "Event details and sign-up";
            contentPlaceholder = document.createElement("span");
            contentPlaceholder.hidden = true;
            content.before(contentPlaceholder);
            dialogContent.appendChild(content);
            signupDialog.showModal();
            document.body.classList.add("has-open-event-dialog");
            closeDialog.focus();
        });

        closeDialog.addEventListener("click", () => signupDialog.close());
        signupDialog.addEventListener("click", event => {
            if (event.target === signupDialog) signupDialog.close();
        });
        signupDialog.addEventListener("close", () => {
            if (contentPlaceholder?.isConnected) {
                contentPlaceholder.replaceWith(dialogContent.firstElementChild);
            }
            contentPlaceholder = null;
            document.body.classList.remove("has-open-event-dialog");
        });
    }

    const eventSearch = document.getElementById("event-search");
    if (eventSearch) {
        const cards = Array.from(document.querySelectorAll(".event-info-card, .featured-event"));
        const emptyState = document.getElementById("event-search-empty");
        function filterEvents() {
            const query = eventSearch.value.trim().toLowerCase();
            let visibleCount = 0;
            cards.forEach(card => {
                const textMatch = card.textContent.toLowerCase().includes(query);
                card.hidden = !textMatch;
                if (textMatch) visibleCount++;
            });
            if (emptyState) emptyState.hidden = visibleCount > 0;
        }
        eventSearch.addEventListener("input", filterEvents);
        const suggestions = document.createElement("div");
        suggestions.className = "page-search-suggestions";
        suggestions.id = "event-search-suggestions";
        suggestions.hidden = true;
        eventSearch.closest(".feature-toolbar").appendChild(suggestions);
        const records = cards.map((card, index) => {
            if (!card.id) card.id = `event-search-item-${index + 1}`;
            return { title: card.querySelector("h2, h3")?.textContent.trim() || "Campus opportunity", text: card.textContent, href: `#${card.id}` };
        });
        eventSearch.addEventListener("input", () => renderPageSuggestions(eventSearch, suggestions, records));
    }

    const orgSearch = document.getElementById("org-search");
    if (orgSearch) {
        const cards = Array.from(document.querySelectorAll(".org-card"));
        function filterOrgs() {
            const active = document.querySelector(".org-filter.active")?.dataset.orgFilter || "all";
            const query = orgSearch.value.trim().toLowerCase();
            let count = 0;
            cards.forEach(card => {
                const matchesCategory = active === "all" || card.dataset.orgCategory === active;
                const matchesSearch = card.textContent.toLowerCase().includes(query);
                const match = matchesCategory && matchesSearch;

                card.hidden = !match;
                if (match) count++;
            });
            const result = document.querySelector(".org-results");
            if (result) {
                result.textContent = "Showing " + count + (count === 1 ? " organization" : " organizations");
            }
            const empty = document.querySelector(".org-empty");
            if (empty) empty.hidden = count !== 0;
        }
        orgSearch.addEventListener("input", filterOrgs);
        const suggestions = document.createElement("div");
        suggestions.className = "page-search-suggestions";
        suggestions.id = "organization-search-suggestions";
        suggestions.hidden = true;
        orgSearch.closest(".org-search").insertAdjacentElement("afterend", suggestions);
        const records = cards.map(card => ({
            title: card.querySelector("h3")?.textContent.trim() || "Organization",
            text: card.textContent,
            href: `#${card.id}`
        }));
        orgSearch.addEventListener("input", () => renderPageSuggestions(orgSearch, suggestions, records));
        document.querySelectorAll(".org-filter").forEach(button => {
            button.addEventListener("click", filterOrgs);
        });
    }

    const achievementFilters = document.querySelectorAll(".achievement-filter");
    if (achievementFilters.length) {
        achievementFilters.forEach(button => {
            button.addEventListener("click", function () {
                achievementFilters.forEach(other => {
                    other.classList.toggle("active", other === button);
                });

                const selected = button.dataset.achievementFilter;
                document.querySelectorAll(".recognition-section").forEach(section => {
                    section.hidden =
                        selected !== "all" && section.dataset.achievementCategory !== selected;
                });
            });
        });
    }
})();
const accountMenuToggle = document.querySelector(".account-menu-toggle");
const accountMenu = document.querySelector(".account-menu");

if (accountMenuToggle && accountMenu) {
    const closeAccountMenu = returnFocus => {
        accountMenu.hidden = true;
        accountMenuToggle.setAttribute("aria-expanded", "false");
        if (returnFocus) accountMenuToggle.focus();
    };

    accountMenuToggle.addEventListener("click", () => {
        const isOpen = accountMenuToggle.getAttribute("aria-expanded") === "true";
        accountMenu.hidden = isOpen;
        accountMenuToggle.setAttribute("aria-expanded", String(!isOpen));
        if (!isOpen) accountMenu.querySelector('[role="menuitem"]')?.focus();
    });

    document.addEventListener("click", event => {
        if (!accountMenu.contains(event.target) && !accountMenuToggle.contains(event.target)) {
            closeAccountMenu(false);
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && !accountMenu.hidden) {
            closeAccountMenu(true);
        }
    });

    accountMenu.addEventListener("keydown", event => {
        const items = [...accountMenu.querySelectorAll('[role="menuitem"]')];
        const index = items.indexOf(document.activeElement);

        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const direction = event.key === "ArrowDown" ? 1 : -1;
            items[(index + direction + items.length) % items.length].focus();
        }

        if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            items[event.key === "Home" ? 0 : items.length - 1].focus();
        }
    });
}

const discoverSocialPosts = document.querySelectorAll(".discover-social[data-post-id]");

if (discoverSocialPosts.length) {
    const startingComments = {
        "discover-intramurals-tryouts": [
            ["Mika R.", "Good luck to everyone trying out!"],
            ["Lance D.", "Looking forward to intramurals week."]
        ],
        "discover-cavocals-auditions": [
            ["Angela P.", "Excited to hear everyone perform."],
            ["Jules M.", "Where can we sign up?"],
            ["CaVocals", "The audition form is on the Events page."]
        ],
        "discover-tryout-lineup": [
            ["Sam T.", "Thanks for sharing the update."],
            ["Rica L.", "I’ll check the Events page on Thursday."],
            ["Noah C.", "Good luck, teams!"],
            ["Mika R.", "Looking forward to the lineup."]
        ]
    };

    const readStore = key => {
        try {
            return JSON.parse(localStorage.getItem(key) || "{}");
        } catch {
            return {};
        }
    };

    const writeStore = (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {}
    };

    const savedLikes = readStore("scon-discover-likes");
    const savedComments = readStore("scon-discover-comments");

    discoverSocialPosts.forEach(post => {
        const postId = post.dataset.postId;
        const baseLikes = Number(post.dataset.baseLikes || 0);
        const likeButton = post.querySelector(".discover-like-action");
        const likeCount = post.querySelector(".discover-like-count");
        const commentsPanel = post.querySelector(".discover-comments");
        const commentList = post.querySelector(".discover-comment-list");
        const commentForm = post.querySelector(".discover-comment-form");
        const commentCount = post.querySelector(".discover-comment-count");
        const shareStatus = post.querySelector(".discover-share-status");
        const comments = savedComments[postId] || startingComments[postId] || [];

        const renderLike = () => {
            const liked = Boolean(savedLikes[postId]);
            likeButton.setAttribute("aria-pressed", String(liked));
            likeButton.querySelector("span").textContent = liked ? "♥" : "♡";
            likeCount.textContent = `${baseLikes + (liked ? 1 : 0)} likes`;
        };

        const renderComments = () => {
            commentList.replaceChildren();
            comments.forEach(([name, text]) => {
                const item = document.createElement("div");
                const avatar = document.createElement("span");
                const copy = document.createElement("div");
                const author = document.createElement("strong");
                const message = document.createElement("span");

                item.className = "discover-comment";
                avatar.className = "discover-comment-avatar";
                avatar.setAttribute("aria-hidden", "true");
                avatar.textContent = name.split(/\s+/).map(part => part[0]).slice(0, 2).join("");
                copy.className = "discover-comment-copy";
                author.textContent = name;
                message.textContent = text;
                copy.append(author, message);
                item.append(avatar, copy);
                commentList.appendChild(item);
            });
            commentCount.textContent = `${comments.length} ${comments.length === 1 ? "comment" : "comments"}`;
        };

        post.querySelectorAll("[data-discover-comment-toggle]").forEach(button => {
            button.addEventListener("click", () => {
                const open = commentsPanel.hidden;
                commentsPanel.hidden = !open;
                post.querySelectorAll("[data-discover-comment-toggle]").forEach(toggle => {
                    toggle.setAttribute("aria-expanded", String(open));
                });
                if (open) commentsPanel.querySelector("input")?.focus();
            });
        });

        likeButton.addEventListener("click", () => {
            savedLikes[postId] = !savedLikes[postId];
            writeStore("scon-discover-likes", savedLikes);
            renderLike();
        });

        commentForm.addEventListener("submit", event => {
            event.preventDefault();
            const input = commentForm.querySelector("input");
            const text = input.value.trim();
            if (!text) return;
            comments.push(["You", text]);
            savedComments[postId] = comments;
            writeStore("scon-discover-comments", savedComments);
            renderComments();
            commentForm.reset();
            input.focus();
        });

        post.querySelector(".discover-share-action").addEventListener("click", async () => {
            const url = new URL(`#${post.closest("article").id}`, window.location.href).href;
            const shareData = {
                title: post.closest("article").querySelector("h3")?.textContent || "SCon Campus Update",
                text: "Check out this campus update on SCon.",
                url
            };

            try {
                if (navigator.share) {
                    await navigator.share(shareData);
                    shareStatus.textContent = "Post shared.";
                } else if (navigator.clipboard?.writeText) {
                    await navigator.clipboard.writeText(url);
                    shareStatus.textContent = "Post link copied.";
                } else {
                    window.prompt("Copy this link:", url);
                }
            } catch (error) {
                if (error.name !== "AbortError") shareStatus.textContent = "Could not share this post.";
            }
        });

        renderLike();
        renderComments();
    });
}


const sconReadStorage = key => {
    try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; }
};
const sconWriteStorage = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; }
};
const sconSavedKey = "scon-saved-posts";
const sconGetSaved = () => {
    const value = sconReadStorage(sconSavedKey);
    return Array.isArray(value) ? value : [];
};

const sconPostCards = document.querySelectorAll(".update-card[data-post-id], .discover-post[data-post-id]");
if (sconPostCards.length) {
    const saved = sconGetSaved();
    sconPostCards.forEach(card => {
        const postId = card.dataset.postId;
        if (!card.id) card.id = `post-${postId}`;
        const actions = card.querySelector(".post-actions, .discover-social-actions");
        if (!actions) return;
        const button = document.createElement("button");
        button.type = "button";
        button.className = "save-post-button";
        button.dataset.savePost = postId;
        const star = document.createElement("span");
        star.setAttribute("aria-hidden", "true");
        const label = document.createElement("span");
        button.append(star, label);
        const renderSaveButton = isSaved => {
            button.setAttribute("aria-pressed", String(isSaved));
            star.textContent = isSaved ? "★" : "☆";
            label.textContent = isSaved ? "Saved" : "Save";
        };
        renderSaveButton(saved.some(item => item.id === postId));
        actions.insertAdjacentElement("afterend", button);
        button.addEventListener("click", () => {
            const current = sconGetSaved();
            const index = current.findIndex(item => item.id === postId);
            if (index >= 0) current.splice(index, 1);
            else {
                const title = card.querySelector("h3")?.textContent.trim() || "Campus post";
                const description = card.querySelector(".discover-post-copy p, :scope > p")?.textContent.trim() || "";
                const image = card.querySelector(".discover-post-image, .update-card-image")?.getAttribute("src") || "";
                current.unshift({ id: postId, title, description, image, href: `${location.pathname.split("/").pop()}#${card.id}` });
            }
            sconWriteStorage(sconSavedKey, current);
            const isSaved = current.some(item => item.id === postId);
            renderSaveButton(isSaved);
        });
    });
}

const savedList = document.querySelector("[data-saved-list]");
if (savedList) {
    const saved = sconGetSaved();
    const empty = document.querySelector("[data-saved-empty]");
    const count = document.querySelector("[data-saved-count]");
    const renderSaved = items => {
        savedList.replaceChildren();
        if (count) count.textContent = `${items.length} saved ${items.length === 1 ? "post" : "posts"}`;
        if (empty) empty.hidden = items.length > 0;
        items.forEach(item => {
            const card = document.createElement("article");
            card.className = "scon-panel scon-saved-card";
            if (item.image) { const image = document.createElement("img"); image.src = item.image; image.alt = ""; card.append(image); }
            const copy = document.createElement("div"); copy.className = "scon-saved-card-copy";
            const title = document.createElement("h2"); title.textContent = item.title;
            const description = document.createElement("p"); description.textContent = item.description;
            const actions = document.createElement("div"); actions.className = "scon-saved-card-actions";
            const open = document.createElement("a"); open.href = item.href; open.textContent = "Open post";
            const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "Remove";
            remove.addEventListener("click", () => { const next = sconGetSaved().filter(entry => entry.id !== item.id); sconWriteStorage(sconSavedKey, next); renderSaved(next); });
            actions.append(open, remove); copy.append(title, description, actions); card.append(copy); savedList.append(card);
        });
    };
    renderSaved(saved);
    document.querySelector("[data-clear-saved]")?.addEventListener("click", () => { sconWriteStorage(sconSavedKey, []); renderSaved([]); });
}

const settingsInputs = document.querySelectorAll("[data-scon-pref]");
if (settingsInputs.length) {
    const prefs = sconReadStorage("scon-settings") || {};
    const applyPrefs = () => {
        document.body.classList.toggle("scon-compact", Boolean(prefs.compact));
        document.documentElement.classList.toggle("scon-reduce-motion", Boolean(prefs.reduceMotion));
        settingsInputs.forEach(input => { input.checked = Boolean(prefs[input.dataset.sconPref]); });
    };
    applyPrefs();
    settingsInputs.forEach(input => input.addEventListener("change", () => {
        prefs[input.dataset.sconPref] = input.checked;
        sconWriteStorage("scon-settings", prefs);
        applyPrefs();
        const status = document.querySelector("[data-settings-status]");
        if (status) status.textContent = "Preference saved on this device.";
    }));
} else {
    const prefs = sconReadStorage("scon-settings") || {};
    document.body.classList.toggle("scon-compact", Boolean(prefs.compact));
    document.documentElement.classList.toggle("scon-reduce-motion", Boolean(prefs.reduceMotion));
}

const profileForm = document.querySelector("[data-profile-form]");
if (profileForm) {
    const profile = sconReadStorage("scon-profile") || {};
    ["name", "course", "interests"].forEach(key => { if (profileForm.elements[key]) profileForm.elements[key].value = profile[key] || ""; });
    profileForm.addEventListener("submit", event => {
        event.preventDefault();
        const values = Object.fromEntries(["name", "course", "interests"].map(key => [key, profileForm.elements[key].value.trim()]));
        sconWriteStorage("scon-profile", values);
        const status = document.querySelector("[data-profile-status]");
        if (status) status.textContent = "Profile saved on this device.";
    });
    const savedCount = document.querySelector("[data-profile-saved-count]");
    if (savedCount) savedCount.textContent = sconGetSaved().length;
}

const helpSearch = document.querySelector("[data-help-search]");
if (helpSearch) helpSearch.addEventListener("input", () => {
    const query = helpSearch.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll(".scon-faq").forEach(item => {
        const show = !query || `${item.textContent} ${item.dataset.terms || ""}`.toLowerCase().includes(query);
        item.hidden = !show; if (show) visible += 1;
    });
    const empty = document.querySelector("[data-help-empty]"); if (empty) empty.hidden = visible > 0;
});

document.querySelectorAll("[data-announcement-filter]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-announcement-filter]").forEach(item => item.classList.toggle("is-active", item === button));
    let visible = 0;
    document.querySelectorAll("[data-announcement]").forEach(item => { const show = button.dataset.announcementFilter === "all" || item.dataset.announcement === button.dataset.announcementFilter; item.hidden = !show; if (show) visible += 1; });
    const empty = document.querySelector("[data-announcements-empty]"); if (empty) empty.hidden = visible > 0;
}));

const calendarSearch = document.querySelector("[data-calendar-search]");
if (calendarSearch) calendarSearch.addEventListener("input", () => {
    const query = calendarSearch.value.trim().toLowerCase(); let visible = 0;
    document.querySelectorAll("[data-activity]").forEach(item => { const show = `${item.textContent} ${item.dataset.activity}`.toLowerCase().includes(query); item.hidden = !show; if (show) visible += 1; });
    const empty = document.querySelector("[data-calendar-empty]"); if (empty) empty.hidden = visible > 0;
});

document.querySelector("[data-guest-mode]")?.addEventListener("click", () => {
    sconWriteStorage("scon-guest-mode", true);
    const status = document.querySelector("[data-guest-status]"); if (status) status.textContent = "Guest mode is active in this browser.";
});

