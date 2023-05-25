# 1. Project Title
mytrAIner

# 2. Project Description
Introducing mytrAIner, a personalized fitness app utilizing AI technology to generate tailored exercise plans and provide users with instructional videos, aimed at helping individuals start their fitness journey and progress as they gain experience.


##### Project Pitch: **[Link](https://www.youtube.com/watch?v=UaY8IJhtW8I)**

<br>

	 Authors: Mike Doswell, Steven Lai, Jeffery Lee, Ebod Shojaei
	 Version: 1.0
## 3. Technologies and Resources Used
	Javascript
	EJS
	CSS
	Bootstrap v4.3.1
	GoogleApis (Material Icon)
	DaFont (Font Types)
	Animate.css
	Transition.css
	SweetAlert2
	jQuery v3.3.1
	Popper v1.14.7
	Axios v1.4.0
	MongoDB v6.0.6 (Database)
	Node.js v18.16.0
	Bcrypt v5.1.0
	connect-mongodb-session v3.1.1
	cors v2.8.5
	csv-parser v3.0.0
	dotenv v16.0.3
	ejs v3.1.9
	express v4.18.2
	express-session v 1.17.3
	joi v17.9.2
	openAI v3.2.1
	openAI-API v1.3.1
	
<br>

# Listing of File Contents of folders
	C:.
	|   .env
	|   .gitignore
	|   exerciseJSONLData.jsonl
	|   index.js
	|   package-lock.json
	|   package.json
	|   Procfile
	|   README.md
	|   Tree.txt
	|   
	+---config
	|       aiTrainer.js
	|       databaseConnection.js
	|       dependencies.js
	|       openaiConnection.js
	|       
	+---public
	|   +---css
	|   |       admin.css
	|   |       allPages.css
	|   |       easterEgg.css
	|   |       footer.css
	|   |       header.css
	|   |       index_invalidSession.css
	|   |       index_validSession.css
	|   |       login.css
	|   |       page_transitions.css
	|   |       profile.css
	|   |       setup.css
	|   |       signup.css
	|   |       timeForm.css
	|   |       
	|   +---fonts
	|   |       Cardium.otf
	|   |       Mollen.otf
	|   |       Retroica.ttf
	|   |       
	|   +---img
	|   |       dumbbell.png
	|   |       dumbbell_diamond.png
	|   |       dumbbell_gold.png
	|   |       loading.gif
	|   |       myTrainerLogo.png
	|   |       profile.png
	|   |       
	|   +---js
	|   |       adminAuthorization
	|   |       callDelete.js
	|   |       callReplace.js
	|   |       createRoutine.js
	|   |       deleteExercise.js
	|   |       editProfile.js
	|   |       formatAlternateRoutine.js
	|   |       formatRoutine.js
	|   |       formatValidate.js
	|   |       generatePrompt.js
	|   |       getAvailability.js
	|   |       getRoutine.js
	|   |       getRoutineTemplate.js
	|   |       loginLimiter.js
	|   |       loginValidation.js
	|   |       logoutRedirect.js
	|   |       matchSuggested.js
	|   |       NewRoutinePrompt.js
	|   |       replaceExercise.js
	|   |       sessionRedirect.js
	|   |       sessionValidation.js
	|   |       showExerciseInfo.js
	|   |       signupValidation.js
	|   |       
	|   \---video
	|           login_bg.mp4
	|           
	+---routes
	|       addTime.js
	|       admin.js
	|       adminDemote.js
	|       adminPromote.js
	|       availabilityData.js
	|       changePassword.js
	|       changePasswordBegin.js
	|       changePasswordEmailSubmit.js
	|       changePasswordSubmit.js
	|       deleteExerciseRoute.js
	|       easterEgg.js
	|       error404.js
	|       home.js
	|       login.js
	|       loginSubmit.js
	|       logout.js
	|       newRoutine.js
	|       newRoutineSubmit.js
	|       openaiGetRoute.js
	|       openaiRoute.js
	|       openaiSubmitRoute.js
	|       profile.js
	|       profileUpdate.js
	|       replaceExerciseRoute.js
	|       sendData.js
	|       setup.js
	|       setupRoutine.js
	|       setupSubmit.js
	|       signup.js
	|       signupSubmit.js
	|       suggestExercises.js
	|       timeForm.js
	|       timeFormSubmit.js
	|       
	\---views
	    |   403.ejs
	    |   404.ejs
	    |   admin.ejs
	    |   availabilityData.ejs
	    |   changePassword.ejs
	    |   changePasswordBegin.ejs
	    |   changePasswordComplete.ejs
	    |   easterEgg.ejs
	    |   error.ejs
	    |   index_invalidSession.ejs
	    |   index_validSession.ejs
	    |   login.ejs
	    |   logout.ejs
	    |   newRoutine.ejs
	    |   openaiTest.ejs
	    |   profile.ejs
	    |   setup.ejs
	    |   signup.ejs
	    |   timeForm.ejs
	    |   
	    \---templates
		    challenge.ejs
		    exercise.ejs
		    footer.ejs
		    header.ejs
		    user.ejs
            

## Features:
- TBD

<br>

## Resources
- **[TBD](LINK)** by TBD (AUTHOR)
	- TBD (DESCRIPTION)
<br>
