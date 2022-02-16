import classes from './ProfileForm.module.css';
import { useRef,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../pages/store/auth-context';

const ProfileForm = () => {
  const newPassRef = useRef();
  const AuthCtx = useContext(AuthContext);
  const history = useHistory();

  const onSubmitHandler=(event)=>{
    event.preventDefault();

    const enteredNewPassword = newPassRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCmB7Z5tga_JNEOIKeuQygeWm5qLB2_vgE',{
      method: 'POST',
      body: JSON.stringify({
        idToken: AuthCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }),
      headers:{'Content-Type':'application/json'}
    }
    

    ).then(res=>{
      //always succeeds!
      history.replace('/');
    })
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPassRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
