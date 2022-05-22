class AuthService {
    getUser = () => {
        if (typeof window !== "undefined") {
          const userStr = localStorage.getItem("user");
          if(userStr) return JSON.parse(userStr);
      
          return null;
        }
      
      };
}

export default new AuthService();