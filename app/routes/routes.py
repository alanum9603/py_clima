from flask import Blueprint, render_template

global_scope = Blueprint('views', __name__)


@global_scope.route('/')
def index():
    return render_template('index.html')