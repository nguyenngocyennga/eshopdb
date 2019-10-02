SERVER_ADDRESS = 13.234.186.55

deploy:
	cd .. && rsync --progress -a view ubuntu@$(SERVER_ADDRESS):/home/ubuntu/
	ssh ubuntu@$(SERVER_ADDRESS) "sudo systemctl restart eshop"
