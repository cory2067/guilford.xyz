import cherrypy
import os
from cherrypy.lib.static import serve_file

class Guilford:
	@cherrypy.expose
	def index(self):
		return serve_file(os.path.abspath(os.getcwd()) + '/index.html')
	
	@cherrypy.expose
	def day(self):
		return serve_file(os.path.abspath(os.getcwd()) + '/day.html')
	
	@cherrypy.expose
	def gpa(self):
		return serve_file(os.path.abspath(os.getcwd()) + '/gpa.html')
	
	@cherrypy.expose
	def widget(self):
		noSchool = [[1,18],[15,16],[24, 25],[11,12,13,14,15],[30],[17],[],[],[14,23],[12],[11,26,27],[24,25,28,29,30,31]];			
		from datetime import datetime
		from datetime import timedelta
		start = datetime(2015,9,8,0,0)
		today = datetime.today()
		def schoolday(dt):
			return not (dt.day in noschool[dt.month-1] or dt.weekday() > 4)

		if schoolday(today) and today.hour >= 14:
			today += timedelta(days=1)

		day = 0
		while start < today:
			if schoolday(start):
				day+=1
				if day == 4:
					day = 0
			start += timedelta(days=1)

		print(['A','B','C','D'][day])
	
	#redirects for these
	@cherrypy.expose
	def letterday(self):	
		raise cherrypy.HTTPRedirect("/day")
	
	@cherrypy.expose
	def gpacalc(self):	
		raise cherrypy.HTTPRedirect("/gpa")


conf = {
	 '/': {
		 'tools.sessions.on': True,
		 'tools.staticdir.root': os.path.abspath(os.getcwd())
	 },
	 '/static': {
		 'tools.staticdir.on': True,
		 'tools.staticdir.dir': '',
	 },
	'global': {
		'server.socket_host': '0.0.0.0',
		'server.socket_port': 80
	}
}

cherrypy.quickstart(Guilford(), '/', conf)

