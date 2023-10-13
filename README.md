
## 환영합니다! Welcome!
- 당신은 한 대형 도서관의 문학소녀 견습생에게 이것저것 물어보며 자신의 취향에 맞는 라이트노벨 또는 아니메를 찾아보는 것 입니다.
- This web app uses chatgpt to assist you finding a favourite light novel to anime contents based on your input values. Please contact me via email if you need any inquiry regarding this project in English.

## 현재 진행 중 작업
-  기존 기능들이 제대로 작동하도록 client 리팩터링.
- redis + celery worker 의 조합으로, django 의 처리 과정을 메모리 실행을 통해 API 로 부터 받아와서 다시 client 로 보내는 프로세스의 반응 속도를 향상 시키는 것.



## Under construction history since 28th Sept.
- Migrating the old vanilla JS project to vite + reactjs. ✅


## Git Convention
```
feat – a new feature is introduced with the changes
fix – a bug fix has occurred
chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
refactor – refactored code that neither fixes a bug nor adds a feature
docs – updates to documentation such as a the README or other markdown files
style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
test – including new or correcting previous tests
perf – performance improvements
ci – continuous integration related
build – changes that affect the build system or external dependencies
revert – reverts a previous commit

Source: https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/
```

## Note
주요 핵심 기능이 담긴 파일은 FrontPage, questionnaire, api 입니다.