# 1. Project Title
	mytrAIner

# 2. Project Description
Introducing mytrAIner, a personalized fitness app utilizing AI technology to generate tailored exercise plans and provide users with instructional videos, aimed at helping individuals start their fitness journey and progress as they gain experience.


##### Project Pitch: **[Link](https://www.youtube.com/watch?v=UaY8IJhtW8I)**

<br>

	 Authors: Mike Doswell, Steven Lai, Jeffery Lee, Ebod Shojaei
	 Version: 1.0
	 
# 3. Technologies and Resources Used
	Javascript
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

# 4. Listing of File Contents of folders
	2800-202310-BBY15
	|   .env
	|   .gitignore
	|   exerciseJSONLData.jsonl
	|   index.js
	|   package-lock.json
	|   package.json
	|   Procfile
	|   README.md
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

<br>

# 5. Installation
To begin you will need to have:

	- A code editor (e.g. VS Code),
	- Node.js installed, 
	- An OpenAPI key,
	- A MongoDB cluster and connection URI,
	- Fitness Exercise Dataset from Kaggle 'https://www.kaggle.com/datasets/edoardoba/fitness-exercises-with-animations'
	
To install and run this web app locally, please follow these steps:

	1. Clone the repository to your local machine. 
	2. Navigate to the project directory in your terminal. 
	3. Install the required dependencies using npm install. 
	4. Create a .env file in the root directory of the project and provide your necessary environmental variables (MONGODB_HOST, MONGO_USER, MONGODB_PASSWORD, MONGODB_SECRET, MONGODB_EXERCISE_DATABASE, MONGODB_SESSION_DATABASE, MONGODB_SESSION_SECRET, NODE_SESSION_SECRET, OPENAI_API_KEY)
	5. Export data from 'https://www.kaggle.com/datasets/edoardoba/fitness-exercises-with-animations' into MongoDB.
	6. Start the application on your terminal using node index.js
	7. Open your web browser and visit 'http://localhost:8000' to access the web app.
	Note: The default port is set to 8000. If you need to change it, you can modify the PORT environment variable in index.js

To deploy this web app to Qoddi hosting, please follow these steps:

	1. Sign up for a Qoddi account at 'qoddi.com' and create a new project.
	2. In the Qoddi dashboard, create a new deployment.
	3. Set up the deployment by adding the repository URL.
	4. Configure the environmental variables on Qoddi (The same variables mentioned in step 4 of the local installation instructions).
	5. Deploy the application using the Qoddi platform. Qoddi will automatically build and deploy the web app. 
	6. Once the deployment is successful you can access the web app from the provided Qoddi deployment URL.
	
Testing Log and Bug Fixes: [LINK](https://docs.google.com/spreadsheets/d/1C3LgINfKB8wusl7ZmSiHxZ26lydoVTqSXj-24yKU7Mo/edit?usp=sharing "Link to Google Sheets")

<br>

# 6. Features:

### User Account Creation and Personal Data Input

**User Registration:** Users can create an account by providing their email address and choosing a secure password. This allows them to securely access and manage their workout information.

**Personal Data Input:** Users can input their personal information, such as age, weight, height, and fitness goals. This data helps the AI algorithm generate personalized workout routines.

### Exercise Preference Input

**Exercise Preferences:** Users can specify their exercise preferences, including preferred workout types. 
	
### Availability Data Input

**Availability Management:** Users can input their availability data, including the days and times when they are available to work out. This data is considered to ensure that the generated workout routines fit within the user's schedule.
	
### AI-Powered Workout Routine Generation

**AI Workout Selection:** The app employs AI algorithms to select suitable workouts from a vast database of exercises. The AI takes into account user stats and fitness goals to curate personalized workout routines.

**Routine Generation:** Based on the user's exercise preferences and availability data, the app generates a routine consisting of various exercises with appropriate sets and reps. This saves time and effort in planning workouts and ensures an optimal fitness experience.

### Workout Review and Modification

**Routine Review:** Users can review their generated workout routine, including details of each exercise. Users may replace workout with aid from the AI.

**Routine Modification:** Users have the flexibility to modify their schedule as needed with the in app schedule form.

### Completed Workout Management

**Completed Workout Deletion:** Once users complete a workout, they can remove it from their active routine. This helps keep their workout list organized and focused on upcoming exercises.

### Profile Preference Management

**Profile Preferences:** Users can view their personal information and manage exercise preferences, availability data, weight, and experience level. This feature allows users to update their details and adapt their fitness goals over time.

### Admin Functionality
**User Management:** The admin has access to view all user accounts and their associated information.

**Promote and Demote Users:** The admin can promote regular users to admin status, granting them the additional privileges to manage user accounts. Similarly, the admin can demote admin users back to regular user status if needed.

### Secret Easter Egg Minigame

**Hidden Surprise:** Discover an exciting secret easter egg minigame within the app! Engage in a fun and interactive experience that adds an simulates the challenges of working out.

<br>

# 7. Credits, References, and Licenses
- **[Fitness Exercise](https://www.kaggle.com/datasets/edoardoba/fitness-exercises-with-animations)** by [EDOARDO CANTAGALLO](https://www.kaggle.com/edoardoba)
	- Dataset containing information relating to exercise and gifs for demonstration.

<br>

# 8. How We Used AI for Our App

For development specifically AI was mainly used for debugging. We would ask the ai for ideas as to why we’re getting this error or why this result was happening when we were expecting this result.

The data set that we got off of kaggle had exercises that didn’t have instructions of how to do those exercises. So one of us had the AI write instructions for each of the 1300+ exercises.

In the app itself, the AI comes up in three places. First is when the initial routine is generated after the setup form has been submitted. Second is after the initial exercises have been selected and similar exercises have been matched from the database, we ask the AI to choose the most relevant exercise from that list of matched exercises based on your personal profile. The third is replacing an exercise in a routine with a new exercise that is based on their personal profile and type of exercise it is replacing.

<br>

# 9. Contact Information

Mike Doswell (Github: [MDoswell](https://github.com/MDoswell "Link to GitHub"))
	
	Email: mike.doswell@gmail.com
	
Steven Lai (Github: [TinLeaves](https://github.com/TinLeaves "Link to GitHub"))

	Email: tinleaves.0@gmail.com	
	
Jeffery Lee (Github: [JefferyWlLee](https://github.com/JefferyWlLee "Link to GitHub"))
	
	Email: jefferywllee@gmail.com
	
Ebod Shojaei (Github: [EbodShojaei](https://github.com/EbodShojaei "Link to GitHub"))

	Email: ebodshojaei@gmail.com
	
