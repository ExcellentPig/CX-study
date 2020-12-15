const sea = {
	use (path, fn_end) {
		$.ajax({
			url: path,
			success (str) {
				function define(fn) {
					let module = {
						exports: {}
					}
					fn(function(){}, )
				}
				eval(str)
			},
			error () {
				alert('失败')
			}
		})
	}
}