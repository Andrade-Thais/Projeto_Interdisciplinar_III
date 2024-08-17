class NotFound(Exception):
    def __init__(self):
        self.message = "Erro - item não encontrado."
        super().__init__(self.message)