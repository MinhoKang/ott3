// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import styled from 'styled-components';
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// const Nav = () => {
//   const [show, setShow] = useState(false);
//   const { pathname } = useLocation();
//   console.log('pathname', pathname);
//   const [inputValue, setInputValue] = useState('');
//   const navi = useNavigate();
//   const auth = getAuth();
//   const provider = new GoogleAuthProvider();
//   const [userDb, setUserdb] = useState({});

//   useEffect(() => {
//     window.addEventListener('scroll', () => {
//       if (window.scroll > 50) {
//         setShow(true);
//       } else {
//         setShow(false);
//       }
//     });

//     return () => {
//       window.addEventListener('scroll', () => {});
//     };
//   }, []);

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//     navi(`/search?q=${e.target.value}`);
//   };

//   console.log(useLocation().search);

//   const handleAuth = () => {
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         console.log(auth);
//         console.log(provider);
//         console.log(result);
//         setUserdb(result.user);
//         console.log(result);
//         if (result.user) {
//           navi('/main');
//         }
//       })
//       .catch((console) => {});
//   };

//   const LogOut = () => {
//     signOut(auth)
//       .then(() => {
//         setUserdb({});
//         navi('/');
//       })
//       .catch((error) => {
//         alert(error);
//       });
//   };

//   useEffect(() => {}, []);
//   return (
//     <Navwrap show={show}>
//       <Logo>
//         <img
//           alt="Coupang Play"
//           src="/images/cplogowhite.svg"
//           onClick={() => (window.location.href = '/')}
//         ></img>
//       </Logo>
//       {pathname === '/' ? (
//         <Login onClick={handleAuth}>로그인</Login>
//       ) : (
//         <>
//           <Input
//             value={inputValue}
//             onChange={handleChange}
//             className="nav_input"
//             type="text"
//             placeholder="searching"
//           />
//           <LogOut>
//             <UserImg>
//               <StateOut>
//                 <span onClick={LogOut}>LOGOUT</span>
//               </StateOut>
//             </UserImg>
//           </LogOut>
//         </>
//       )}
//     </Navwrap>
//   );
// };

// export default Nav;

// const Navwrap = styled.nav`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   height: 0;
//   background-color: ${(props) => (props.show ? 'black' : 'transparent')};
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 0 36px;
//   letter-spacing: 16px;
//   z-index: 3;
// `;

// const Logo = styled.a`
//   padding: 0;
//   width: 80px;
//   margin-top: 4px;
//   max-height: 70px;
//   font-size: 0;
//   display: inline-block;

//   img {
//     display: block;
//     width: 100%;
//   }
// `;

// const Login = styled.a`
//   background-color: rgba(0, 0, 0, 0.6);
//   padding: 8px 16px;
//   text-transform: uppercase;
//   letter-spacing: 1.5px;
//   border: 10x solid #f9f9f9;
//   border-radius: 4px;
//   transition: all 0.2 ease 0s;

//   &:hover {
//     background-color: #f9f9f9;
//     color: #000;
//     border-color: transparent;
//   }
// `;

// const Input = styled.div`
//   position: fixed;
//   left: 50%;
//   transform: translate(-50%, 0);
//   background-color: rgba(0, 0, 0, 0.582);
//   border-radius: 5px;
//   color: white;
//   padding: 5px;
//   border: none;
// `;

// const LogOut = styled.div``;

// const UserImg = styled.div``;

// const StateOut = styled.div``;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Navigate, json, useLocation, useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

const Nav = () => {
  const initialUserDb = localStorage.getItem('userDb')
    ? JSON.parse(localStorage.getItem('userDb'))
    : {};
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [inputvalue, setInputValue] = useState('');
  const navi = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const [userDb, setUserDb] = useState(initialUserDb);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname == '/') {
          navi('/main');
        }
        navi('/main');
      } else {
        navi('/');
      }
    });
  }, [auth, navi]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      console.log(window.scrollY);
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    navi(`/search?q=${e.target.value}`);
  };

  //https:localhost3000/search?q=avengers

  console.log('useLocation.search', useLocation().search);
  // ?q=avengers
  // avengers

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserDb(result.user);
        localStorage.setItem('UserDB', JSON.stringify(result.user));
        console.log('result', result);
      })
      .catch((error) => {});
  };

  const LogOutt = () => {
    signOut(auth)
      .then(() => {
        setUserDb({});
        navi('/');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Navwrap show={show}>
      <Logo>
        <img
          alt="Coupang Play Logo"
          src="/images/cplogowhite.svg"
          onClick={() => (window.location.href = '/')}
        ></img>
      </Logo>

      {pathname === '/' ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            value={inputvalue}
            onChange={handleChange}
            className="nav_input"
            type="text"
            placeholder="searching"
          />
          <LogOut>
            <UserImg src={userDb.photoURL} alt={userDb.displayName} />
            <StateOut>
              <span onClick={LogOutt}>LOGOUT</span>
            </StateOut>
          </LogOut>
        </>
      )}
    </Navwrap>
  );
};

export default Nav;

const Navwrap = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 0;
  background-color: ${(props) => (props.show ? 'black' : 'transparent')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 10x solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2 ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Input = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.582);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: none;
`;

const LogOut = styled.div``;

const UserImg = styled.div``;

const StateOut = styled.div``;
