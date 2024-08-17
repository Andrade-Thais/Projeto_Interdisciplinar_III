class EmailInUse(Exception):
    def __init__(self, email):
        self.email = email
        self.message = f"Email já está sendo usado por outro usuário. Por favor, tente outro email."
        super().__init__(self.message)