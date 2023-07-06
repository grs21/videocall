export default class PrepareVideoCall {
    constructor(response) {
        this.appId = '';
        this.token = '';
        this.channel = '';
        this.full_Name = '';
        this.hospitalName = '';
        this.branchName = '';
        this.doctorName = '';
        this.startDate = '';
        this.appointment_Minute = 0;
        this.paymentStatus = false;
        this.uid = 0;
        this.status = null;
        this.time = 0;
        this.statusAppointment = 0;
        this.responseMessage = null;
        this.responseStatus = false;
        this.hospitalGroup = '';
        this.doctorPersonId = 0;
        this.appointmentNumber = '';
        this.patientPhone = '';
        this.hospitalCode = '';
        this.identityNumber = '';
        this.source = '';
        this.roomId = '';
        this.patientId = '';
        this.doctorId = '';
        this.setResponse(response);
    };


    setResponse(response) {
        if (response !== undefined) {
            const parsedResponse = response.prepareVideoCall[0];
            this.appId = parsedResponse.appId || '';
            this.token = parsedResponse.token || '';
            this.channel = parsedResponse.channel || '';
            this.full_Name = parsedResponse.full_Name || '';
            this.hospitalName = parsedResponse.hospitalName || '';
            this.branchName = parsedResponse.branchName || '';
            this.doctorName = parsedResponse.doctorName || '';
            this.startDate = parsedResponse.startDate || '';
            this.appointment_Minute = parsedResponse.appointment_Minute || 0;
            this.paymentStatus = parsedResponse.paymentStatus || false;
            this.uid = parsedResponse.uid || 0;
            this.status = parsedResponse.status || null;
            this.time = parsedResponse.time || 0;
            this.statusAppointment = parsedResponse.statusAppointment || 0;
            this.responseMessage = parsedResponse.responseMessage || null;
            this.responseStatus = parsedResponse.responseStatus || false;
            this.hospitalGroup = parsedResponse.hospitalGroup || '';
            this.doctorPersonId = parsedResponse.doctorPersonId || 0;
            this.appointmentNumber = parsedResponse.appointmentNumber || '';
            this.patientPhone = parsedResponse.patientPhone || '';
            this.hospitalCode = parsedResponse.hospitalCode || '';
            this.identityNumber = parsedResponse.identityNumber || '';
            this.source = parsedResponse.source || '';
            this.roomId = parsedResponse.roomId || '';
            this.patientId = parsedResponse.patientId || '';
            this.doctorId = parsedResponse.doctorId || '';
        }else {
            console.log('PrepareVideoCall','Undefined');
        }

    }

    getAppId() {
        return this.appId;
    }

    getToken() {
        return this.token;
    }

    getChannel() {
        return this.channel;
    }
    getFullName() {
        return this.full_Name;
    }

    getHospitalName() {
        return this.hospitalName;
    }

    getBranhName() {
        return this.branchName;
    }
    getDoctorName() {
        return this.doctorName;
    }

    getStartDate() {
        return this.startDate;
    }

    getAppointmentMinute() {
        return this.appointment_Minute;
    }
    getPaymentStatus() {
        return this.paymentStatus;
    }

    getHospitalGroup() {
        return this.hospitalGroup;
    }

    getDoctorPersonId() {
        return this.doctorPersonId;
    }
    getAppoinmentNumber() {
        return this.appointmentNumber;
    }

    getPatientPhone() {
        return this.patientPhone;
    }

    getHospitalCode() {
        return this.hospitalCode;
    }
    getIdentityNumber() {
        return this.identityNumber;
    }

    getSource() {
        return this.source
    }

    getRoomId() {
        return this.roomId;
    }
    getPatientId() {
        return this.patientId;
    }

    getDoctorId() {
        return this.doctorId;
    }
}