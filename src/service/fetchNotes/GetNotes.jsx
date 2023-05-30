import axios from 'axios';

export const GetNotes = () => {
    try {
      const response = axios.get(`http://localhost:8080/getNotesPage/${localStorage.getItem("Token")}`);
      return response;
    } catch (error) {
      return error;
    }
  }