const express = require('express');
const router = express.Router();
const { getUserDetails, addUserDetails,userLogin,isTokenValid} = require('../controllers/users');


router
  .route('/')
  .get(getUserDetails);

router
  .route('/register')
  .post(addUserDetails);

router 
  .route('/login')
  .post(userLogin);

  router
    .route('/valid')
      .post(isTokenValid);
  
      
module.exports = router;