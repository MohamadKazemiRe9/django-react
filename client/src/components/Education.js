import React , {useState,useEffect} from 'react';
import "./Style.css";
import axios from "axios";
import Card from "./card/Card";

export default function Education(props) {
    const [title,settitle]= useState("");
    const [location,setLocation] = useState("");
    const [startDate,setStartDate] = useState("");
    const [endDate,setEndDate] = useState("");
    const [educations,setEducations] = useState(props.educations);
    let newEducations = []
    const [auth,setAuth] = useState(false);

    useEffect(()=>{
        if(props.userAuth === props.user.username){
            setAuth(true);
        }else{
            setAuth(false);
        }
    });

    useEffect(() => {
        setEducations(props.educations);
    }, [props.educations]); 

    const createEducation = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/education/',
            data: {
                profile: props.user.id,
                "title": title,
                "location": location,
                'start':startDate,
                'end':endDate
            }
        }).then(
            res=>newEducations = [...educations,res.data]
        ).then(res=>setEducations(newEducations)).catch(err=>ErrorHapens());
    }

    const ErrorHapens = () => {
        alert("please check enteries and try again")
    }

    const onChangeTitle = (event) => {
        settitle(event.target.value);
    }
    const onChangeLocation = (event) => {
        setLocation(event.target.value);
    }
    const onChangeStart = (event) => {
        setStartDate(event.target.value)
    }
    const onChangeEnd = (event) => {
        setEndDate(event.target.value)
    }

    const onDeleteEducation = (id) =>{
        newEducations = [];
        newEducations = educations.filter(education=>education.id !== id)
        setEducations(newEducations);
        newEducations=[];
    }

    return (
        <div> 
            <h3 className="education_header">Educations:</h3>
            <div className="education_body">
                <div className="row">
                {educations.map((education,index) => {
                return (
                        <div key={education.id} className="col-12 col-lg-4 mb-3">
                                <Card index={index} 
                                    title={education.title} 
                                    location={education.location}
                                    start={education.start}
                                    end={education.end}
                                    auth={auth}
                                    id={education.id}
                                    onDelete={onDeleteEducation}/>
                        </div>
                    )
                })}
                </div>
            </div>

            {props.userAuth === props.user.username?
                <form className="education_form">
                    <input type="text" required id="education_input_text_title" placeholder="Title"
                        className="education_input_text" value={title} onChange={onChangeTitle} />
                    <label htmlFor="education_input_text_title" 
                        className="education_input_label">Title</label>
                    <input type="text" required id="education_input_text_location" placeholder="Location"
                        className="education_input_text" value={location} onChange={onChangeLocation}/>
                    <label htmlFor="education_input_text_location" 
                        className="education_input_label">Location</label>
                    <input type="date" required id="education_input_date_start" placeholder="Start date"
                        className="education_input_text education_input_date" value={startDate} onChange={onChangeStart} name="start"/>
                    <label htmlFor="education_input_date_start"
                        className="education_input_label">Start date</label>
                    <input type="date" id="education_input_date_end" placeholder="End date"
                        className="education_input_text education_input_date" value={endDate} onChange={onChangeEnd} name="end"/>
                    <label htmlFor="education_input_date_end"
                        className="education_input_label">End date</label>
                    <div className="btn_education_form" onClick={createEducation}>Add it!</div>
                </form>
                :""
            }
        </div>
    )
}
