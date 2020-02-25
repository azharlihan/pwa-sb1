document.addEventListener('DOMContentLoaded', function() {
	// Inisialisasi materialize sidenav
	M.Sidenav.init(document.querySelectorAll('.sidenav'));

	// Daftarkan event listener untuk setiap tautan menu
	document.querySelectorAll('.sidenav a').forEach(function(elm) {
		elm.addEventListener('click', function(event) {
			// Tutup sidenav
			if (window.screen.width < 992) M.Sidenav.getInstance(document.querySelector('.sidenav')).close();

			// Muat konten halaman yang akan dipaggil
			page = event.target.getAttribute('href').substr(1);
			loadPage(page);
		});
	});

	var page = window.location.hash.substr(1);
	if (page == "") page = 'home';
	loadPage(page);

	function loadPage(page) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4) {
				var content = document.querySelector('#main-content');
				if (this.status == 200) {
					content.innerHTML = xhttp.responseText;
					// Karena khusus halaman home ada slider, maka aktifkan slider nya
					if (page == 'home') M.Slider.init(document.querySelectorAll('.slider'));

					window.scrollTo(0,0);
				} else if (this.status == 404) {
					content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
				} else {
					content.innerHTML = '<p>Ups.. Halaman tidak dapat diakses.</p>'
				}
			}
		};
		xhttp.open('GET', 'pages/' + page + '.html', true);
		xhttp.send();
	}
});