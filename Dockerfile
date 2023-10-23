FROM python:3.9.18

COPY . ./app
WORKDIR ./app
RUN pip install -r requirements.txt

RUN python manage.py migrate
RUN python manage.py runscript fixture

CMD ["python","manage.py","runserver","0.0.0.0:8001"]
