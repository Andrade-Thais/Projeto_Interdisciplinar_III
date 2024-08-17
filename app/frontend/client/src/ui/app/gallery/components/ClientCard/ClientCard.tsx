import { Button } from 'flowbite-react';
import React, {useState, useEffect, useMemo} from 'react';
import { retrieveClientInfo } from '../../../../../helpers/gallery/retrieveClientInfo';
import { capitalize } from '../../../../../utils/capitalize';

const ClientCard = ({ clientId, photosNumber, galleryId, folderId}) => {

    const [clientData, setClientData] = useState({})

  useEffect(() => {
    retrieveClientInfo(clientId).then((data) => {
      setClientData(data);
    });
  }, [clientId]);

    return (
        <div className="flex flex-col h-64 p-4 border-1 m-4 border-gray-300 rounded-md">
            <div className="flex-1">
          <h4 className="text-lg font-bold text-gray-700">{clientData.fullName && capitalize(clientData.fullName)}</h4>
                <p className="mt-2 text-sm text-gray-600">Fotografias do Pacote - {photosNumber}</p>
            </div>
            <Button className="bg-success text-white rounded-md transition-colors duration-200 ease-in-out">
                Enviar link de acesso
            </Button>
        </div>
    );
};

export default ClientCard;