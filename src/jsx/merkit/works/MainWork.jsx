
import "../../../css/merkit/works-css/mainWork.css"

export default function MainWorks() {
    return (
        <div className="mainWork">

            <section className="developerIntro">

                <div className="introText">
                    <span className="introLabel">DEVELOPER</span>

                    <h1> Hi, I'm <span>Anshu</span> </h1>

                    <h2>Java Full Stack Developer</h2>
                    <div className="links">

                        <a href="https://www.instagram.com/who.is.anshu" target="_blank" rel="noopener noreferrer" title="Instagram">
                            <i className="bi bi-instagram"></i>
                        </a>

                        <a href="https://github.com/anshu0a" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <i className="bi bi-github"></i>
                        </a>

                        <a href="https://x.com/whois_anshu" target="_blank" rel="noopener noreferrer" title="X">
                            <i className="bi bi-twitter-x"></i>
                        </a>

                        <a href="https://www.facebook.com/who.is.anshu" target="_blank" rel="noopener noreferrer" title="Facebook">
                            <i className="bi bi-facebook"></i>
                        </a>

                    </div>

                    <p>
                        I enjoy building web applications and turning ideas into
                        simple, useful and interactive digital experiences.
                        I work mainly with Java, Spring Boot, React, MySQL,
                        REST APIs, JPA, MVC and Spring Security.
                    </p>


                    <div className="introTech">
                        <span>Java</span>
                        <span>Spring Boot</span>
                        <span>React</span>
                        <span>MySQL</span>
                    </div>

                </div>

                <div className="introImage">
                    <img src="/img/me.gif" alt="Anshu Kumar Gupta" />
                </div>

            </section>


            <section className="myWorks">

                <div className="worksHeading">
                    <span>WHAT I'VE BUILT</span>
                    <h2>My Works</h2>
                </div>


                <div className="worksGrid">

                    <a href="/" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/merkit.png" alt="Merkit" />
                        </div>

                        <div className="workContent">
                            <span>01</span>
                            <h3>Merkit</h3>
                            <p>
                                A digital time capsule and social platform
                                for creating, sharing and preserving moments.
                            </p>

                            <div className="workTags">
                                <small>Java</small>
                                <small>Spring Boot</small>
                                <small>React</small>
                            </div>
                        </div>
                    </a>


                    <a href="https://taskly-three-sage.vercel.app/taskly/challenges/private" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/taskly.png" alt="Taskly" />
                        </div>

                        <div className="workContent">
                            <span>02</span>
                            <h3>Taskly</h3>
                            <p>
                                A task and challenge management application
                                built with a full-stack architecture.
                            </p>

                            <div className="workTags">
                                <small>React</small>
                                <small>Spring Boot</small>
                                <small>MySQL</small>
                            </div>
                        </div>
                    </a>


                    <a href="https://insta-theta-blond.vercel.app" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/instax.png" alt="Instax" />
                        </div>

                        <div className="workContent">
                            <span>03</span>
                            <h3>Instax</h3>
                            <p>
                                An Instagram-inspired social media application
                                for sharing photos and connecting with others.
                            </p>

                            <div className="workTags">
                                <small>React</small>
                                <small>Node.js</small>
                                <small>MongoDB</small>
                            </div>
                        </div>
                    </a>


                    <a href="https://valentine-ten-murex-36.vercel.app/" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/valentine.png" alt="Valentine Wish" />
                        </div>

                        <div className="workContent">
                            <span>04</span>
                            <h3>Valentine Wish</h3>
                            <p>
                                An interactive and playful web experience
                                created specially for Valentine's Day.
                            </p>

                            <div className="workTags">
                                <small>React</small>
                                <small>CSS</small>
                                <small>JavaScript</small>
                            </div>
                        </div>
                    </a>


                    <a href="https://visit-osz7.onrender.com/home" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/visit.png" alt="Visit" />
                        </div>

                        <div className="workContent">
                            <span>05</span>
                            <h3>Visit</h3>
                            <p>
                                A web project created to explore places,
                                experiences and modern web interactions.
                            </p>

                            <div className="workTags">
                                <small>React</small>
                                <small>JavaScript</small>
                                <small>CSS</small>
                            </div>
                        </div>
                    </a>


                    <a href="https://me0anshu.github.io/gallery/two.html" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/playon.png" alt="Playon" />
                        </div>

                        <div className="workContent">
                            <span>06</span>
                            <h3>Playon</h3>
                            <p>
                                A creative web project focused on an engaging
                                and interactive user experience.
                            </p>

                            <div className="workTags">
                                <small>React</small>
                                <small>JavaScript</small>
                                <small>CSS</small>
                            </div>
                        </div>
                    </a>
                    <a href="https://cad-flip-game.vercel.app" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/flipMe.png" alt="Flip Me" />
                        </div>
                        <div className="workContent">
                            <span>07</span>
                            <h3>Flip Me</h3>
                            <p>
                                A fun interactive game built with simple
                                browser-based game logic.
                            </p>
                            <div className="workTags">
                                <small>JavaScript</small>
                                <small>HTML</small>
                                <small>CSS</small>
                            </div>
                        </div>
                    </a>
                    <a href="https://anshu0a.github.io/simon/si.html" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/simon.png" alt="Simon Game" />
                        </div>
                        <div className="workContent">
                            <span>09</span>
                            <h3>Simon Game</h3>
                            <p>
                                A memory game where players repeat an increasing
                                sequence of lights and sounds.
                            </p>
                            <div className="workTags">
                                <small>JavaScript</small>
                                <small>Game Logic</small>
                            </div>
                        </div>
                    </a>

                    <a href="https://guess-me-azure.vercel.app/" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/guess.png" alt="Number Guessing Game" />
                        </div>
                        <div className="workContent">
                            <span>10</span>
                            <h3>Number Guessing</h3>
                            <p>
                                A simple guessing game where players try to find
                                the randomly generated number.
                            </p>
                            <div className="workTags">
                                <small>JavaScript</small>
                                <small>Game Logic</small>
                            </div>
                        </div>
                    </a>

                    <a href="https://anshu0a-weather.netlify.app" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/weather.png" alt="Tick" />
                        </div>
                        <div className="workContent">
                            <span>12</span>
                            <h3>Weather Info</h3>
                            <p>
                                A weather application that provides current weather
                                information and conditions for different locations.
                            </p>

                            <div className="workTags">
                                <small>JavaScript</small>
                                <small>API</small>
                                <small>HTML</small>
                                <small>CSS</small>
                            </div>
                        </div>
                    </a>
                    <a href="https://me0anshu.github.io/gallery/one.html" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/gallery.png" alt="Photo Gallery" />
                        </div>

                        <div className="workContent">
                            <span>13</span>
                            <h3>Photo Gallery</h3>
                            <p>
                                A simple photo gallery for viewing, exploring and
                                organizing images with a clean interactive layout.
                            </p>

                            <div className="workTags">
                                <small>JavaScript</small>
                                <small>HTML</small>
                                <small>CSS</small>
                            </div>
                        </div>
                    </a>
                    <a href="https://anshu0a.github.io/Tic-Tac-Toe" target="_blank" rel="noopener noreferrer" className="workCard">
                        <div className="workImage">
                            <img src="/proj/tick.png" alt="Tic Tac Toe" />
                        </div>
                        <div className="workContent">
                            <span>08</span>
                            <h3>Tic Tac Toe</h3>
                            <p>
                                A classic two-player game with interactive
                                gameplay and winning logic.
                            </p>
                            <div className="workTags">
                                <small>JavaScript</small>
                                <small>HTML</small>
                                <small>CSS</small>
                            </div>
                        </div>
                    </a>


                </div>

            </section>

        </div>
    )
}