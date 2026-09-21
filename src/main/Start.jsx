import "./start.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const messages = [
    "Plant a memory . . .",
    "Save a moment . . .",
    "Write to your future self . . .",
    "Leave something for tomorrow . . .",
    "Capture what matters . . .",
    "Keep a moment close . . .",
    "Create something to remember . . .",
    "Save today for someday . . .",
    "Turn moments into memories . . .",
    "Give your memories a place . . .",
    "Preserve a piece of today . . .",
    "Let today live beyond today . . .",
    "Leave a note for your future self . . .",
    "Hold on to what matters . . .",
    "Make a memory worth returning to . . ."
];

const particles = Array.from({ length: 220 }, (_, i) => ({
    id: i,
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    dx: `${Math.random() * 140 - 70}px`,
    dy: `${Math.random() * 140 - 70}px`,
    time: `${18 + Math.random() * 25}s`,
    shine: `${5 + Math.random() * 8}s`,
    delay: `${Math.random() * -20}s`,
    size: `${1 + Math.random() * 2}px`
}));
 const user = JSON.parse( window.localStorage.getItem("user"))

export default function Start() {

    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {

        const current = messages[index];
        let delay = deleting ? 55 : 90;
        if (!deleting && text === current)    delay = 1800;
        if (deleting && text === "")  delay = 500;

        const timer = setTimeout(() => {
            if (!deleting) {
                setText(current.substring(0, text.length + 1));

                if (text.length === current.length) {
                    setDeleting(true);
                }
            } else {
                setText(current.substring(0, text.length - 1));

                if (text.length === 0) {
                    setDeleting(false);
                    setIndex((prev) => (prev + 1) % messages.length);
                }
            }
        }, delay);

        return () => clearTimeout(timer);
    }, [text, index, deleting]);

    return (
        <div className="stxt isFlex">
            <div className="particleBg">{particles.map((particle) => (<span key={particle.id} className="particle" style={{ "--x": particle.x, "--y": particle.y, "--dx": particle.dx, "--dy": particle.dy, "--time": particle.time, "--shine": particle.shine, "--delay": particle.delay, "--size": particle.size }} />))}</div>
            <div className="toppx isFlex wd">
                <div className="logoDiv">
                    <img className="icon" src="/svg/icon.svg" alt="Merkit" />
                    <img className="logo" src="/svg/logo.svg" alt="Merkit" />
                </div>
                <div className="inOutBox isFlex">
                    {user == null ?
                        <>
                            <Link to="/login" className="opt isFlex opt1 clk">Login</Link>
                            <Link to="/register" className="opt isFlex opt2 clk flow">Sign Up</Link>
                        </> :
                        <Link to="/merkit/home" className="opt isFlex opt2 clk flow">Let’s Begin</Link>
                    }
                </div>
            </div>
            <div className="bdyy isFlex wd">
                <div className="prtuv prtuv1 isFlex">
                    <h1>Moments Deserve to Live Forever</h1>
                    <p>Capture today, preserve what matters, and rediscover your story when the moment is right.</p>
                    <div className="inOutBox isFlex">
                        {user == null ?
                            <>
                                <Link to="/login" className="opt isFlex opt1 clk">Login</Link>
                                <Link to="/register" className="opt isFlex opt2 clk flow">Sign Up</Link>
                            </> :
                            <Link to="/merkit/home" className="opt isFlex opt2 clk flow">See What’s New</Link>
                        }
                    </div>
                    <div className="typingText wd isFlex">
                        <span>✦</span>
                        <span >{text}</span>
                        <span className="cursor">|</span>
                    </div>
                </div>
                <div className="prtuv prtuv2 isFlex">
                    <div className="orb">
                        <div className="orbRing ring1"></div>
                        <div className="orbRing ring2"></div>
                        <div className="orbRing ring3"></div>
                        <div className="orbCore"></div>
                        <div className="orbDot dot1"></div>
                        <div className="orbDot dot2"></div>
                        <div className="orbDot dot3"></div>
                    </div>
                </div>
            </div>
            {/* -------------------- feature Box --------------- */}
            <div className="featureBox">

                <div className="featureTitle">
                    <span>WHAT YOU CAN DO</span>
                    <p>Everything you need to create, preserve and rediscover what matters.</p>
                </div>

                <div className="featureList">

                    <div className="feature">
                        <div className="featureNumber">01</div>
                        <div className="featureText">
                            <h3>Digital Time Capsule</h3>
                            <p>Plant a memory today and discover it when the moment arrives.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/img/start.jpg" alt="Digital Time Capsule" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">02</div>
                        <div className="featureText">
                            <h3>Moments</h3>
                            <p>Capture the little things and keep your meaningful moments close.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/img/start.jpg" alt="Moments" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">03</div>
                        <div className="featureText">
                            <h3>Articles</h3>
                            <p>Write your thoughts, stories and experiences and preserve them.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/short/article.png" alt="Articles" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">04</div>
                        <div className="featureText">
                            <h3>Explore</h3>
                            <p>Discover different moments and experiences across Merkit.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/img/start.jpg" alt="Explore" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">05</div>
                        <div className="featureText">
                            <h3>Memory Map</h3>
                            <p>Connect your memories with the places where they happened.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/short/map.png" alt="Memory Map" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">06</div>
                        <div className="featureText">
                            <h3>Calendar</h3>
                            <p>Travel through your timeline and revisit moments by date.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/short/cal.png" alt="Calendar" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">07</div>
                        <div className="featureText">
                            <h3>AI Companion</h3>
                            <p>Talk, reflect and keep meaningful conversations with your AI companion.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/short/ai.png" alt="AI Companion" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">08</div>
                        <div className="featureText">
                            <h3>Notifications</h3>
                            <p>Stay updated with the moments and activities that matter to you.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/img/start.jpg" alt="Notifications" />
                        </div>
                    </div>
                    <div className="feature">
                        <div className="featureNumber">09</div>
                        <div className="featureText">
                            <h3>Create</h3>
                            <p>Create articles, moments and digital time capsules that are yours to keep.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/short/create.png" alt="Create" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">10</div>
                        <div className="featureText">
                            <h3>Login</h3>
                            <p>Sign in securely and access your memories, creations and personal space.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/short/login.png" alt="Login" />
                        </div>
                    </div>

                    <div className="feature">
                        <div className="featureNumber">11</div>
                        <div className="featureText">
                            <h3>Forgot Password</h3>
                            <p>Recover your account securely and get back to your memories without losing your data.</p>
                        </div>
                        <div className="featurePreview">
                            <img src="/short/forgot.png" alt="Forgot Password" />
                        </div>
                    </div>

                </div>
            </div>
            {/* -------------------- footer -------------------- */}
            <div className="featureBox"></div>
            <footer className="merkitFooter wd">
                <div className="footerTop wd">
                    <div className="footerBrand">
                        <div className="footerLogo">
                            <img src="/svg/icon.svg" alt="Merkit" />
                            <img src="/svg/logo.svg" alt="Merkit" />
                        </div>
                        <p>
                            Capture today, preserve what matters, and rediscover your moments tomorrow.
                        </p>
                    </div>

                    <div className="footerLinks">
                        <div className="footerCol">
                            <h4>Explore</h4>
                            <Link to="/merkit/home">Home</Link>
                            <Link to="/merkit/explore">Search</Link>
                            <Link to="/merkit/explore/map">Map</Link>
                            <Link to="/merkit/explore/timeline">Calendar</Link>
                        </div>

                        <div className="footerCol">
                            <h4>Create</h4>
                            <Link to="/merkit/create">Article</Link>
                            <Link to="/merkit/create/capsule">Time Capsule</Link>
                            <Link to="/merkit/bot/new">AI Chat</Link>
                            <Link to="/merkit/create/prediction">Prediction</Link>
                        </div>

                        <div className="footerCol">
                            <h4>Account</h4>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Sign Up</Link>
                            <Link to="/forgot">Forgot</Link>
                            <Link to="/profile">Profile</Link>

                        </div>
                    </div>
                </div>

                <div className="footerBottom wd">
                    <span>© {new Date().getFullYear()} Merkit. All rights reserved.</span>
                    <span>Made for moments that matter.</span>
                </div>
            </footer>
        </div>
    );
}