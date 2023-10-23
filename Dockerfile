FROM python:3.9.18

COPY . .
RUN pip install -r requirements.txt

RUN python manage.py migrate


CMD ["python","manage.py","runserver","0.0.0.0:8001"]