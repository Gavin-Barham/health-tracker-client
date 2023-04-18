export default function getCookie(name) {
    // Split the document.cookie string into individual cookies
    const cookies = document.cookie.split("; ");
    
    // Loop through the cookies to find the one with the specified name
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split("=");
      if (cookie[0] === name) {
        // If the cookie with the specified name is found, return its value
        return decodeURIComponent(cookie[1]);
      }
    }
    
    // If the cookie with the specified name is not found, return null
    return null;
  }