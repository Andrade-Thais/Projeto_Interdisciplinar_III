class ServerError(Exception):
    def __init__(self):
        self.message = "Ocorreu um erro interno no servidor. Por favor, tente novamente mais tarde."
        super().__init__(self.message)