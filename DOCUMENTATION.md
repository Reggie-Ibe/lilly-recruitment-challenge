# Lilly Technical Challenge Documentation

## Approach
1) Break down the challenge into key requirements/objectives (Medicine Management gui that read/writes/updates data from the Json file) 

2) Set up environment, explored potential dependencies, imported them and ran Postman test.

3) Enhance the backend by scripting components I deemed necessary to meet the objectives (Endpoint, Display and Fetch meds, Table, Stats, Data Manipulation & Validation Method)
 
4) Moved to the frontend, and designed the interface with HTML, and CSS (Added Tables, and a Form with validation as the user-friendly solution)

5) Integrated the backend API with the front end, added a refresh after input to give page a live feel.

6) Did testing and debugging to find potential issues.



## Objectives - Innovative Solutions
I began my challenge by installing Python. After that, I made sure to check for any necessary constraints to ensure everything would go smoothly. Since I had limited experience with Python API formatting, I spent some time familiarizing myself with it. Setting up my environment on my Mac was crucial, so I installed Python and Warp for a more user-friendly terminal experience.

During this process, I encountered a zsh error that said “command not found,” which turned out to be a path issue. To resolve this, I consulted a couple of websites to figure out how to set up my Mac’s path for Python correctly. Eventually, I created a symbolic link to point Python to the right file, as explained on a thread online.

Once I was set up, the rest was straightforward. I made use of `getElementById` to reference elements and called a custom fetch async function. To handle potential issues with invalid data, I implemented a try-catch block, ensuring that the front-end could process errors more gracefully. I also created forms on the front end to enhance user interaction with the API.

During testing, I ran into an issue where modifying records with blank names caused a system error. To tackle this, I added a click-to-edit feature to the table, making it much more intuitive. I then introduced validation upon data entry to prevent similar errors in the future and added a confirmation prompt for deleting records, which helps safeguard against accidental clicks.

To enhance the overall design, I made the page responsive and organized it into sections dedicated to forms, tables, and statistics. Additionally, I incorporated the company’s color theme for a cohesive look. It’s been a rewarding process, and I’m excited about the progress I’ve made!


## Problems Faced
1) Data Persistence Challenges

JSON file updates were not always saving correctly.

Solution: Used proper file handling (with open('data.json', 'w') as file:) and ensured atomic write operations.

2) Validation Issues

Initially, users could submit empty or incorrect values.

Solution: Implemented validation rules in both frontend and backend.

## Resources Used
1) https://mac.install.guide/terminal/path and 
2) https://www.youtube.com/watch?v=-HatIX08HAY
3) https://stackoverflow.com/questions/18425379/how-to-set-pythons-default-version-to-3-x-on-os-x
4) Co-Pilot for Visual code to review and modify

## Evaluation
Overall, I found this challenge to be a great opportunity to apply my knowledge and test some basics. The objectives were listed  in a method that allowed a structured approach which helped in completing the challenge efficiently.
I did run out of time while facing my challenge, as i had to watch videos, and read articles while scripting.  
Some areas went smoothly, such as frontend development and  integration, while debugging backend issues took more time than expected.
I couldnt succesfully code a statistics function into the back-end, to bypass this, an alternative feature that dynamically calculated averages in the browser using JavaScript based on the fetched data from the back-end API was added to emulate the requirement.