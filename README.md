## invox test

### Description
This is a test project for invox
- uploading image and the path then evaluating them by "tentative AI" api
- store the results in a database

### Usage
1. clone the project

2. setup the project
```bash
cd inv_t
bash setup.sh build
```

3. start the project
```bash
bash setup.sh start
```

4. send image
```bash
curl -X POST -F image=@$(pwd)/img/pexels-efrem-efre-17571091.jpg localhost:3000/image_evaluation
```

5. stop the project
```bash
bash setup.sh stop
```
