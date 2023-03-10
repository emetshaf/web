from flask import render_template, request, redirect, make_response
import requests
from uuid import uuid4
from web.config import api_status
from web.views import app_views


@app_views.route('/signup', methods=['GET', 'POST'], strict_slashes=False)
def signup():
    cache_id = uuid4()
    if api_status()['status'] == 'OK':
        access_token = request.cookies.get('access_token')
        if access_token != None:
            return redirect('/')
        url = "http://localhost/auth/signup"
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            payload = {
                'username': username,
                'password': password
            }
            log = requests.post(url, json=payload)
            if log.status_code == 201:
                auth_token = log.json()['auth_token']
                response = make_response(redirect('/'))
                response.set_cookie(
                    'access_token', auth_token, max_age=60*60*24)
                return response
        return render_template(
            'signup.html',
            cache_id=cache_id,
        )
    return render_template('error.html', error_code='500', message='Internal Server Error', cache_id=cache_id)


@ app_views.route('/signin', methods=['GET', 'POST'], strict_slashes=False)
def signin():
    cache_id = uuid4()
    if api_status()['status'] == 'OK':
        access_token = request.cookies.get('access_token')
        if access_token != None:
            return redirect('/')
        url = "http://localhost/auth/signin"
        if request.method == 'POST':
            username = request.form['username']
            password = request.form['password']
            payload = {
                'username': username,
                'password': password
            }
            log = requests.post(url, json=payload)
            if log.status_code == 200:
                auth_token = log.json()['auth_token']
                response = make_response(redirect('/'))
                response.set_cookie(
                    'access_token', auth_token, max_age=60*60*24)
                return response

        return render_template(
            'signin.html',
            cache_id=cache_id,
        )
    return render_template('error.html', error_code='500', message='Internal Server Error', cache_id=cache_id)


@app_views.route('/signout', methods=['GET'], strict_slashes=False)
def signout():
    """ Signout page """
    access_token = request.cookies.get('access_token')
    requests.post(
        "http://localhost/auth/signout",
        headers={'Authorization': 'access_token {}'.format(
            access_token)})
    response = make_response(redirect('/'))
    response.set_cookie('access_token', '', expires=0)
    return response
