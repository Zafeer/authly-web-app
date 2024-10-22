import { Breakpoint, Grid } from '@mui/material';
import DeviceWidthProvider from '@/providers/DeviceWidthProvider';

const ScreenAwareTOC = ({ breakpoint }: { breakpoint?: Breakpoint }) => {
  return (
    <DeviceWidthProvider breakpoint={breakpoint || 'md'}>
      <Grid />
    </DeviceWidthProvider>
  );
};

export default ScreenAwareTOC;
