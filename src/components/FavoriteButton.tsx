import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import Button from '@mui/material/Button';
import { useIsFavorite } from '../hooks/use-is-favorite';
import { useDispatch } from '../hooks/redux-hooks';
import { FAVORITES_ADD, FAVORITES_DELETE } from '../services/constants/favorites-constants';

type TFavoriteButtonProps = {
    valuteCode: string
}

export function FavoriteButton(props: TFavoriteButtonProps) {
    const { valuteCode } = props
    const isFavorite = useIsFavorite(valuteCode)
    const dispatch = useDispatch()
    function addToFavorite() {
        dispatch({
            type: isFavorite ? FAVORITES_DELETE : FAVORITES_ADD,
            valuteCode: valuteCode
        })
    }
    return (
        <Button onClick={addToFavorite}> {
            isFavorite ? <FavoriteOutlinedIcon fontSize='small'></FavoriteOutlinedIcon> :
                <FavoriteBorderOutlinedIcon fontSize='small'></FavoriteBorderOutlinedIcon>
        }
        </Button>

    )
}