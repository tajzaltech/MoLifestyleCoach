/**
 * Reflection Engine - MoLifestyle AI Assistant
 * Semantic-based response system grounded in Logotherapy and MoLifestyle philosophy
 */

// Philosophy Bank - Core wisdom and guidance
const philosophyBank = {
    meaning: [
        "The search for meaning is not a secondary pursuit; it is the primary motivational force in humans. As Viktor Frankl articulated, meaning is not an abstract concept but something to be discovered in the concrete circumstances of your existence. It emerges when you bridge the gap between your unique potential and the objective demands of your current situation.",
        "Existential vacuum—the feeling of emptiness and pointlessness—often arises when we prioritize external success over internal resonance. To find meaning, we must shift our focus from 'What do I want from life?' to 'What is life asking of me right now?' This shift in perspective transforms a burden into a responsibility, and a obstacle into an invitation for growth.",
        "Meaning is found at the intersection of three dimensions: the creative (what you give to the world), the experiential (what you take from the world in terms of beauty, art, and love), and the attitudinal (the stance you take toward unavoidable suffering). Even in the most restrictive circumstances, you retain the ultimate human freedom: the ability to choose your own attitude.",
        "The crisis of meaning in modernity is often a crisis of noise. We are so busy fulfilling expectations that we have lost the ability to hear our own conscience—that 'internal compass' Frankl spoke of. Finding clarity requires a period of radical honesty and the courage to strip away everything that is not truly yours."
    ],
    career: [
        "Professional dissatisfaction is rarely about the tasks themselves and almost always about a lack of ontological alignment. When your daily activities do not resonate with your core values, your spirit begins to atrophy. A career is not merely a means of survival; it is a platform for the expression of your individual contribution to the human story.",
        "The modern 'hustle culture' often leads to what we call 'success without fulfillment.' You may be climbing the ladder with great efficiency, but if it is leaning against the wrong wall, every step forward takes you further from yourself. True professional clarity comes from defining success not by standard KPIs, but by the depth of meaning you derive from your contribution.",
        "Career transitions are moments of profound existential opportunity. They force us to confront the question: 'Who am I beyond my title?' By decoupling your identity from your job description, you gain the freedom to pursue work that actually matters. This is the difference between a job, a career, and a calling.",
        "When stuck in professional stagnation, the solution is rarely another certification or a better resume. It is high-depth reflection on your 'Why.' As Nietzsche famously said, and Frankl echoed: 'He who has a why to live can bear almost any how.' Once your purpose is clear, the practical logistics of your career move will begin to align."
    ],
    relationships: [
        "Authenticity is the prerequisite for genuine connection. If you are presenting a curated version of yourself to gain acceptance, you are not actually being seen—and therefore, you cannot truly be loved. Meaningful relationships require the courage to be vulnerable and the integrity to show up without masks.",
        "Connection is not the absence of conflict; it is the presence of respect and shared meaning. In the MoLifestyle philosophy, we look at relationships as a shared journey toward something greater than both individuals. When two people are aligned in their search for meaning, their connection becomes unshakeable.",
        "The quality of your external connections is a direct reflection of your internal clarity. Isolation is often not a lack of people, but a lack of self-understanding. When you are disconnected from your own core, your attempts to connect with others will inevitably feel hollow or based on mutual utility rather than genuine encounter.",
        "Boundaries are an act of radical care. By defining where you end and another begins, you create the safety required for true intimacy to flourish. Without boundaries, empathy becomes enmeshment, and support becomes resentment. Honor your own space so you can truly honor the space of another."
    ],
    anxiety: [
        "Anxiety is not a malfunction of the mind; it is often a signal from the self that something is fundamentally out of alignment. It is the friction between who you are and how you are living. Instead of viewing anxiety as an enemy to be suppressed, we approach it as a diagnostic tool—an invitation to sit with the discomfort until its message becomes clear.",
        "Overthinking is the mind's attempt to control an uncertain future through recursive logic. But clarity is never found in the loop of thought; it is found in the decisive act of living. In Logotherapy, we use 'paradoxical intention'—the act of facing what we fear—to break the grip of anticipatory anxiety.",
        "The 'Noogenic Neurosis'—anxiety arising from spiritual or existential distress—is the hallmark of our age. It cannot be 'fixed' with simple relaxation techniques because its root is a hunger for meaning. To quiet the anxious mind, you must provide it with a purpose that is greater than the perceived threat.",
        "Emotional overwhelm is a sign that your psychological architecture is being asked to carry more than it was designed for. You need a structural recalibration. This begins by distinguishing between what you can change, what you must bear, and where your true agency lies."
    ],
    identity: [
        "You are not a finished product; you are a continuous act of becoming. Your past informs you, but it does not define you. Your authentic identity lies in the 'space between stimulus and response'—the space where you choose who you will be in the next moment. This is the radical responsibility of human existence.",
        "The search for the 'true self' is often a misunderstanding. You do not 'find' your self as if it were hidden in a drawer; you 'create' your self through every meaningful choice you make. Your identity is the sum of the values you uphold when the stakes are high.",
        " societal expectations act as a gravity that pulls us away from our own truth. To live authentically is to resist that gravity. It requires a quiet mind and a loud heart. We must move beyond the labels given by our parents, our peers, and our culture to discover the unique essence that remains when all else is stripped away.",
        "Self-esteem is a byproduct of living meaningfully, not an end in itself. If you seek to 'feel better' about yourself, you will fail. But if you seek to live a life that is worthy of respect, self-esteem will follow naturally as an inevitable consequence."
    ],
    clarity: [
        "Most confusion is actually a fear of the truth. We claim to be 'lost' because being lost is safer than acknowledging a reality that requires a difficult change. Clarity is not a lack of fog; it is the specialized vision to see through it. It begins with the radical honesty to name your situation exactly as it is.",
        "The path to clarity is a process of subtraction, not addition. You don't need more advice, more books, or more information. You need to remove the distractions, the 'shoulds,' and the noise that prevent you from hearing your own inner clarity. Silence is the laboratory where truth is distilled.",
        "Uncertainty is the natural state of a growing life. If you feel perfectly certain, you are likely standing still. The goal is not to eliminate uncertainty, but to develop the capacity to act meaningfully despite it. Clarity comes through the commitment to the first step, not through a view of the entire path.",
        "When you feel stuck, it is often because you are trying to solve an existential problem with practical logic. You cannot 'logically' decide what makes your life worth living. You must feel it. Clarity emerges when your cognitive understanding aligns with your intuitive resonance."
    ],
    purpose: [
        "Purpose is the bridge between your individual existence and the vast needs of the world. It is the answer to the question: 'What is it that I alone can contribute?' This is not a grand, singular destiny, but a quiet, daily alignment with your core values and the situations you find yourself in.",
        "To find your purpose, look at the problems that bother you the most. Your greatest frustrations often point toward your deepest callings. Where the world's deep hunger meets your own deep joy—as Frederick Buechner said—that is where your purpose resides.",
        "Living with purpose is a discipline of the will. It means choosing the path of meaning over the path of least resistance. It is the constant recalibration of your actions to ensure they are serving something higher than your immediate comfort or ego.",
        "A life without purpose is like a ship without a rudder—it is at the mercy of every wave and wind. Purpose provides the stability and direction needed to navigate the inevitable storms of life with dignity and resolve."
    ],
    growth: [
        "True transformation is a profound structural change, not a cosmetic adjustment. It involves the dismantling of old narratives that no longer serve you and the patient construction of a new way of being. This process is inherently uncomfortable, as it requires you to outgrow the version of yourself that felt safe.",
        "Sustainable growth is measured not by the speed of change, but by its integration. Real progress happens in the quiet moments between the breakthroughs—in the daily commitment to live according to your newly discovered truths. It is a slow, steady move toward greater complexity and higher awareness.",
        "The biggest obstacle to growth is the attachment to who you currently are. To become who you could be, you must be willing to let go of who you have been. This 'ego-death' is the necessary precursor to any significant level of personal evolution.",
        "In the MoLifestyle approach, we see growth as the expansion of your capacity for meaning. The more you grow, the more depth you can hold, the more beauty you can experience, and the more responsibility you can bear with grace."
    ],
    general: [
        "Deep change begins at the level of the story you tell yourself about your life. If your narrative is one of victimhood, you will remain stuck. If your narrative is one of agency and meaning, you contain the power to rearchitect your entire reality.",
        "The most important work you will ever do is the work of understanding yourself. This is not self-indulgence; it is the ultimate responsibility. A man who does not know himself is a danger to himself and others. A man who knows himself is a force of clarity for the world.",
        "We often spend our lives waiting for life to begin—for the perfect job, the perfect partner, or the perfect time. But life is what is happening while you are waiting. The meaning you seek is available right now, in the very struggle you are trying to avoid.",
        "Philosophy is not for the classroom; it is for the clinic of life. It is the practical toolkit for navigating the human condition with wisdom, courage, and a deep, unshakeable sense of purpose."
    ]
};

// Keywords for categorization
const categoryKeywords = {
    meaning: ['meaning', 'purpose', 'why', 'pointless', 'empty', 'fulfillment', 'significance'],
    career: ['career', 'job', 'work', 'professional', 'calling', 'path', 'direction', 'transition'],
    relationships: ['relationship', 'connection', 'love', 'family', 'friend', 'partner', 'lonely', 'isolation'],
    anxiety: ['anxious', 'anxiety', 'stress', 'worried', 'overwhelm', 'panic', 'fear', 'nervous'],
    identity: ['identity', 'self', 'who am i', 'authentic', 'myself', 'real me', 'lost'],
    clarity: ['confused', 'clarity', 'clear', 'stuck', 'uncertain', 'lost', 'direction', 'focus'],
    purpose: ['purpose', 'mission', 'calling', 'contribution', 'legacy', 'impact'],
    growth: ['grow', 'growth', 'change', 'transform', 'better', 'improve', 'develop']
};

/**
 * Categorize user input based on keyword matching
 */
function categorizeQuery(input) {
    const lowerInput = input.toLowerCase();
    const scores = {};

    // Score each category
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
        scores[category] = keywords.filter(keyword => lowerInput.includes(keyword)).length;
    }

    // Find highest scoring category
    const maxScore = Math.max(...Object.values(scores));

    if (maxScore === 0) return 'general';

    const topCategories = Object.entries(scores)
        .filter(([_, score]) => score === maxScore)
        .map(([category]) => category);

    // Return random category from top matches
    return topCategories[Math.floor(Math.random() * topCategories.length)];
}

/**
 * Get a reflective response based on the user's query
 */
export function processReflectiveQuery(userInput) {
    if (!userInput || userInput.trim().length === 0) {
        return {
            category: 'general',
            response: "I'm here to help you reflect. Share what's on your mind, and let's explore it together."
        };
    }

    const category = categorizeQuery(userInput);
    const responses = philosophyBank[category] || philosophyBank.general;

    // Select a random response from the category
    const response = responses[Math.floor(Math.random() * responses.length)];

    // Add personalized preamble based on the category
    const preambles = {
        meaning: "Reflecting on the ontological dimension of meaning:",
        career: "From the perspective of professional alignment and existential depth:",
        relationships: "Regarding the architecture of human connection:",
        anxiety: "On the nature of your current emotional experience:",
        identity: "Concerning the continuous process of self-creation:",
        clarity: "On the pursuit of radical honesty and clarity:",
        purpose: "In relation to the discovery and cultivation of purpose:",
        growth: "On the structural requirements for sustainable transformation:",
        general: "A perspective grounded in the MoLifestyle philosophy:"
    };

    const preamble = preambles[category] || preambles.general;

    return {
        category,
        response: `${preamble}\n\n${response}`,
        suggestedActions: getSuggestedActions(category)
    };
}

/**
 * Get suggested next steps based on category
 */
function getSuggestedActions(category) {
    const actions = {
        meaning: [
            { label: "Explore the Philosophy", link: "/guidance" },
            { label: "Book a Discovery Session", link: "/connect" }
        ],
        career: [
            { label: "Learn the Methodology", link: "/guidance" },
            { label: "Start Your Journey", link: "/connect" }
        ],
        relationships: [
            { label: "About My Approach", link: "/about" },
            { label: "Book a Session", link: "/connect" }
        ],
        anxiety: [
            { label: "Watch Deep Insights", link: "/guidance#youtube-discovery" },
            { label: "Connect with Me", link: "/connect" }
        ],
        identity: [
            { label: "Discover the Journey", link: "/about" },
            { label: "Book Your Reflection", link: "/connect" }
        ],
        clarity: [
            { label: "See the Method", link: "/guidance" },
            { label: "Book a Session", link: "/connect" }
        ],
        purpose: [
            { label: "Explore Guidance", link: "/guidance" },
            { label: "Start Your Discovery", link: "/connect" }
        ],
        growth: [
            { label: "Learn More", link: "/about" },
            { label: "Begin Your Journey", link: "/connect" }
        ],
        general: [
            { label: "Explore My Work", link: "/guidance" },
            { label: "Connect with Me", link: "/connect" }
        ]
    };

    return actions[category] || actions.general;
}

/**
 * Get a greeting message
 */
export function getGreeting() {
    const greetings = [
        "Welcome. This is a space for radical honesty and existential reflection. What is currently weighing on your mind?",
        "Clarity begins with the courage to look within. I'm here to facilitate your reflection. What brings you here today?",
        "Meaning is discovered in the details of our struggles. Let's explore yours together. What are you currently facing?",
        "I am here to help you navigate the complexities of your current experience. What part of your journey would you like to understand better?"
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
}
