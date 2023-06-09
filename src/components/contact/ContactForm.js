import React, { useState } from 'react';
import '../../styles/contact/ContactForm.css';


function ContactForm() {

    const [status, setStatus] = useState("Send Message");
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus("Sending...");
        const { firstName, lastName, email, phone, message } = event.target.elements;
        let details = {
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            phone: phone.value,
            message: message.value
        }
        try {
            let response = await fetch("http://localhost:5000/contact/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                body: JSON.stringify(details),
            });
            setStatus("Send Message");
            let result = await response.json();
            alert(`Status: ${result.status}. Your message has been sent!`);
            console.log(`Status: ${result.status}. Your message has been sent!`)
            // alert('Your message has been sent!');
            // console.log('Your message has been sent!')
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                message: ''
            });
        } catch (error) {
            console.error(error);
            alert('Something went wrong, please try again later.');
        }
    };
    return (
        <>
            <div className='conForm-Main container-fluid'>
                <div className='conForm-Main2'>
                    <div className='conInfo my-5 col-md-5 col-lg-4'>
                        <div className='conInfo2'>
                            <h1 className='conInfo-Head'>Contact Information</h1>
                            <p className='conInfo-TagLine'>Fill up the form and our team will get back to you within 24 hours.</p>
                            <div className='conIcons1 '>
                                <p className='d-flex'><i className="fas fa-phone mx-2 mt-1"></i><div className='conAdd1 mx-2'> +1 202-xxx-2132</div></p>
                                <p className='d-flex'><i className="fas fa-envelope mx-2 mt-1"></i><div className='conAdd1 mx-2 text-white'> <a className='conAdd12' href='mailto:'>-----</a></div></p>
                                <p className='d-flex'><i className="fas fa-map-marker-alt mx-2 mt-1"></i> <div className='conAdd1 mx-2'>New Hampshire, Lake Maude</div></p>
                            </div>
                            <div className='socialIcons py-3 '>
                                <span className='socialIcons2 '>
                                    <a className='iconsList' target='_blank' href='https://www.twitter.com' rel='noreferrer noopener'><i className="iconsList2 fab fa-twitter fa-lg px-2"></i></a>
                                    <a className='iconsList' target='_blank' href='https://www.facebook.com' rel='noreferrer noopener'><i className="iconsList2 fab fa-facebook fa-lg px-2"></i></a>
                                    <a className='iconsList' target='_blank' href='https://www.instagram.com' rel='noreferrer noopener'><i className="iconsList2 fab fa-instagram fa-lg px-2"></i></a>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='conForm-Detail py-5 col-md-7 col-lg-8'>
                        <div className='ContactTitle'>Contact CarboEx</div>
                        <div className='conForm-Detail2'>
                            {/* <form className='form1 py-3' onSubmit={handleSubmit} > */}
                            <form className='form1 py-3' action="https://formsubmit.co/devtestingexample1@gmail.com" method="POST">
                                <div className='form2'>
                                    <div className="row mb-4 rClass1">
                                        <div className="col">
                                            <div className="form-outline rClass12">
                                                <label className="form-label font-weight-bold" for="">First name:</label>
                                                <input type="text" id="" className="form-control inputInfoAll" name="firstName"
                                                    placeholder='Please enter your firstname'
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline">
                                                <label className="form-label" for="">Last name:</label>
                                                <input type="text" id="" className="form-control inputInfoAll" name="lastName"
                                                    placeholder='Please enter your lastname'
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-4 rClass2">
                                        <div className="col">
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="">Email:</label>
                                                <input type="email" id="" className="form-control inputInfoAll" name="email"
                                                    placeholder='Please enter a valid email address'
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-outline mb-4">
                                                <label className="form-label" for="">Phone:</label>
                                                {/* <PhoneInput
                                                    defaultCountry="IN"
                                                    type="tel"
                                                    className="form-control inputInfoAll"
                                                    id="" name="phone"
                                                    placeholder='Please enter your phone number'
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required /> */}
                                                <input type="tel" id="" className="form-control inputInfoAll" name="phone"
                                                    placeholder='Please enter your phone number'
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" for="">Your Message:</label>
                                        <textarea placeholder='TYPE YOUR MESSAGE HERE...' className="form-control inputInfoAll" id="" rows="4" name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required></textarea>
                                    </div>
                                    <div className='sendMessageBtn'>
                                        <button type="submit" name='_next' value="https://carboex.vercel.app/contact" className="submitConFBtn btn btn-primary btn-block mt-3">{status}</button>
                                        {/* <button type="submit" value="Send Message" className="submitConFBtn btn btn-primary btn-block mt-3">{status}</button> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default ContactForm