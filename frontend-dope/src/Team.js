import "./Team.css";

// TOOD: please add your own headshots and bios!!

function Team() {
    return(
        <div className="team">
            <div className="team-container">
                <div className="header-section">
                    <div className="welcome">Meet the Team</div>
                    <div className="summary">
                        We’re a group of five students from the University of California, 
                        Los Angeles. This project was completed as a part of our senior capstone.
                    </div>
                </div>
                <div className="team-one">
                    <div className="image-one">
                        <img src="/headshot.jpeg" alt="hanna"></img>
                    </div>
                    <div className="bio-one">
                        Joseph Pinto
                        <div className="info">some text about year, major, interests, what you’re doing after graduation, hobbies, involvement, etc.</div>
                    </div>
                    <div className="image-two">
                        <img src="/headshot.jpeg" alt="hanna"></img>
                    </div>
                    <div className="bio-two">
                        Julia Offerman
                        <div className="info">some text about year, major, interests, what you’re doing after graduation, hobbies, involvement, etc.</div>
                    </div>
                    <div className="image-three">
                        <img src="/hanna_headshot.png" alt="hanna"></img>
                    </div>
                    <div className="bio-three">
                        Hanna Co
                        <div className="info">
                            Hanna is a four-year computer science major, minoring in Digital Humanities. 
                            Following her graduation from UCLA, she will be pursuing a Masters in Computer Science. In her
                            free time, she enjoys reading and baking.
                        </div>
                    </div>
                </div>
                <div className="team-two">
                    <div className="image-four">
                        <img src="/headshot.jpeg" alt="hanna"></img>
                    </div>
                    <div className="bio-four">
                        Suzie Xu
                        <div className="info">some text about year, major, interests, what you’re doing after graduation, hobbies, involvement, etc.</div>
                    </div>
                    <div className="image-five">
                        <img src="/headshot.jpeg" alt="hanna"></img>
                    </div>
                    <div className="bio-five">
                        Bryan Tang
                        <div className="info">some text about year, major, interests, what you’re doing after graduation, hobbies, involvement, etc.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;